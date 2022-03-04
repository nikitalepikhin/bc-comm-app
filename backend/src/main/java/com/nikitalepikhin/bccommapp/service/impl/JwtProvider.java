package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.exception.JwtAuthenticationException;
import com.nikitalepikhin.bccommapp.model.Role;
import com.nikitalepikhin.bccommapp.repository.RefreshTokenRepository;
import com.nikitalepikhin.bccommapp.service.JwtService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
class JwtProvider {

    private final UserDetailsService userDetailsService;
    @Value("${jwt.access.validity.in.seconds}")
    private Long accessTokenValidityInMs;
    @Value("${jwt.refresh.validity.in.seconds}")
    private Long refreshTokenValidityInMs;
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;
    @Value("${jwt.authorization.header}")
    private String authorizationHeader;

    @Autowired
    public JwtProvider(
            @Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        jwtSecretKey = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes());
    }

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

    public boolean validateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return (claimsJws.getBody().getExpiration().after(new Date()));
        } catch (JwtException exception) {
            throw new JwtAuthenticationException("Provided JWT token is either expired or invalid.");
        }
    }

    public Optional<String> getEmail(String token) {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return Optional.of(claimsJws.getBody().getSubject());
        } catch (JwtException e) {
            return Optional.empty();
        }
    }

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

    public String extractTokenFromHttpRequest(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }

    private Jws<Claims> getClaimsJws(String token) throws JwtException {
        return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token);
    }

    public Optional<Role> getRole(String token) {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return Optional.of(Role.valueOf((String) claimsJws.getBody().get("role")));
        } catch (JwtException e) {
            return Optional.empty();
        }
    }

    public Optional<String> getFamilyId(String token) {
        try {
            Jws<Claims> claimsJws = getClaimsJws(token);
            return Optional.of((String) claimsJws.getBody().get("family"));
        } catch (JwtException e) {
            return Optional.empty();
        }
    }
}
