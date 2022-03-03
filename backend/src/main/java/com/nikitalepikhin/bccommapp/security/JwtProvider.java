package com.nikitalepikhin.bccommapp.security;

import com.nikitalepikhin.bccommapp.exception.JwtAuthenticationException;
import com.nikitalepikhin.bccommapp.model.Role;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {

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
    public JwtProvider(@Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        jwtSecretKey = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes());
    }

    public String createToken(String email, Role role, Boolean accessTokenIsRequired) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role.name());
        claims.put("type", accessTokenIsRequired ? JwtType.ACCESS.name() : JwtType.REFRESH.name());
        Date currentDate = new Date();
        Long validityInMs = accessTokenIsRequired ? accessTokenValidityInMs : refreshTokenValidityInMs;
        Date expirationDate = new Date(currentDate.getTime() + validityInMs);
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

    public String getEmail(String token) {
        Jws<Claims> claimsJws = getClaimsJws(token);
        return claimsJws.getBody().getSubject();
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public String extractTokenFromHttpRequest(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }

    private Jws<Claims> getClaimsJws(String token) {
        return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token);
    }

    public Role getRole(String token) {
        Jws<Claims> claimsJws = getClaimsJws(token);
        return Role.valueOf((String) claimsJws.getBody().get("role"));
    }
}
