package com.nikitalepikhin.bccommapp.security;

import com.nikitalepikhin.bccommapp.exception.JwtAuthenticationException;
import com.nikitalepikhin.bccommapp.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Autowired
    public JwtFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = jwtService.extractTokenFromHttpRequestHeader(request);
            if (token != null) {
                if (!token.startsWith("Bearer ")) {
                    throw new JwtAuthenticationException("Authorization header should start with Bearer.");
                }
                token = token.substring(7);
                if (jwtService.validateToken(token)) {
                    Optional<Authentication> authentication = jwtService.getAuthentication(token);
                    if (authentication.isPresent()) {
                        SecurityContextHolder.getContext().setAuthentication(authentication.get());
                    } else {
                        throw new JwtAuthenticationException("Authentication could not be found.");
                    }
                }
            }
        } catch (JwtAuthenticationException e) {
            SecurityContextHolder.clearContext();
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            logger.error(e.getMessage());
            throw new JwtAuthenticationException(e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
}
