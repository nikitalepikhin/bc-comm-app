package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RefreshTokenDto;
import com.nikitalepikhin.bccommapp.exception.JwtAuthenticationException;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.model.RefreshToken;
import com.nikitalepikhin.bccommapp.model.Role;
import com.nikitalepikhin.bccommapp.repository.RefreshTokenRepository;
import com.nikitalepikhin.bccommapp.service.JwtService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserDetailsService userDetailsService;
    @Value("${jwt.access.validity.in.ms}")
    private Long accessTokenValidityInMs;
    @Value("${jwt.refresh.validity.in.ms}")
    private Long refreshTokenValidityInMs;
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;
    @Value("${jwt.authorization.header}")
    private String authorizationHeader;

    @Autowired
    public JwtServiceImpl(RefreshTokenRepository refreshTokenRepository, UserDetailsService userDetailsService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public RefreshTokenDto refreshAccessToken(String oldRefreshToken) throws RefreshTokenException {
        if (validateToken(oldRefreshToken) && refreshTokenExists(oldRefreshToken)) {
            Optional<String> email = getEmail(oldRefreshToken);
            Optional<Role> role = getRole(oldRefreshToken);
            if (email.isPresent() && role.isPresent()) {
                if (!refreshTokenHasBeenUsed(oldRefreshToken)) {
                    String newAccessToken = createAccessToken(email.get(), role.get());
                    String newRefreshToken = createRefreshTokenForExistingFamily(oldRefreshToken);
                    return new RefreshTokenDto(newAccessToken, newRefreshToken);
                } else {
                    invalidateTokenFamily(oldRefreshToken);
                    throw new RefreshTokenException("Refresh token reuse detected.");
                }
            } else {
                throw new RefreshTokenException("Email or role could not be found in the provided token.");
            }
        } else {
            throw new RefreshTokenException("Provided refresh token is invalid.");
        }
    }

    private boolean refreshTokenExists(String oldRefreshToken) {
        Optional<String> familyId = getFamilyId(oldRefreshToken);
        if (familyId.isPresent()) {
            return refreshTokenRepository.findByRefreshTokenAndFamilyId(oldRefreshToken, familyId.get()) != null;
        } else {
            return false;
        }
    }

    private void invalidateTokenFamily(String oldRefreshToken) {
        Optional<String> familyId = getFamilyId(oldRefreshToken);
        familyId.ifPresent(refreshTokenRepository::deleteAllByFamilyId);
    }

    private boolean refreshTokenHasBeenUsed(String refreshToken) {
        Optional<String> familyId = getFamilyId(refreshToken);
        if (familyId.isPresent()) {
            RefreshToken refreshTokenEntry = refreshTokenRepository.findByRefreshTokenAndFamilyId(refreshToken, familyId.get());
            return refreshTokenEntry != null ? refreshTokenEntry.getUsed() : true;
        } else {
            return true;
        }
    }

    private void setRefreshTokenToUsed(String refreshToken, String familyId) {
        RefreshToken refreshTokenEntry = refreshTokenRepository.findByRefreshTokenAndFamilyId(refreshToken, familyId);
        refreshTokenRepository.deleteById(refreshTokenEntry.getId());
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .refreshToken(refreshToken)
                        .familyId(familyId)
                        .used(true)
                        .build()
        );
    }

    private void createNewEntry(String newRefreshToken, String familyId) {
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .refreshToken(newRefreshToken)
                        .familyId(familyId)
                        .build()
        );
    }

    @Override
    public void logOut(String refreshToken) {
        invalidateTokenFamily(refreshToken);
    }

    @Override
    public String createAccessToken(String email, Role role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role.name());
        claims.put("type", "access");
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + accessTokenValidityInMs);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currentDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();
    }

    @Override
    public String createRefreshTokenForExistingFamily(String oldRefreshToken) {
        Jws<Claims> claimsJws = getClaimsJws(oldRefreshToken);
        Claims claims = Jwts.claims().setSubject(claimsJws.getBody().getSubject());
        claims.put("role", claimsJws.getBody().get("role"));
        claims.put("type", "refresh");
        String familyId = (String) claimsJws.getBody().get("family");
        claims.put("family", familyId);
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + refreshTokenValidityInMs);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currentDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();
    }

    @Override
    public String createRefreshTokenForNewFamily(String email, Role role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role.name());
        claims.put("type", "refresh");
        String familyId = UUID.randomUUID().toString();
        claims.put("family", familyId);
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + refreshTokenValidityInMs);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currentDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();
    }

    @Override
    public boolean validateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return (claimsJws.getBody().getExpiration().after(new Date()));
        } catch (JwtException exception) {
            throw new JwtAuthenticationException("Provided JWT token is either expired or invalid.");
        }
    }

    @Override
    public Optional<String> getEmail(String token) {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return Optional.of(claimsJws.getBody().getSubject());
        } catch (JwtException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Authentication> getAuthentication(String token) {
        try {
            Optional<String> email = getEmail(token);
            if (email.isPresent()) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email.get());
                return Optional.of(new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));
            } else {
                return Optional.empty();
            }
        } catch (UsernameNotFoundException e) {
            return Optional.empty();
        }
    }

    @Override
    public String extractTokenFromHttpRequestHeader(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }

    @Override
    public Optional<Role> getRole(String token) {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return Optional.of(Role.valueOf((String) claimsJws.getBody().get("role")));
        } catch (JwtException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<String> getFamilyId(String token) {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return Optional.of((String) claimsJws.getBody().get("family"));
        } catch (JwtException e) {
            return Optional.empty();
        }
    }

    @Override
    public Long getExpiration(String token) {
        Jws<Claims> claimsJws = getClaimsJws(token);
        return claimsJws.getBody().getExpiration().getTime();
    }

    private Jws<Claims> getClaimsJws(String token) throws JwtException {
        return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token);
    }
}
