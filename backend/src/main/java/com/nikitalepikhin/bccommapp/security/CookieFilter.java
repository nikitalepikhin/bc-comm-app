package com.nikitalepikhin.bccommapp.security;

import com.nikitalepikhin.bccommapp.exception.CookieFilterException;
import com.nikitalepikhin.bccommapp.exception.GenericAuthenticationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Component
public class CookieFilter extends OncePerRequestFilter {

    private final Set<String> unprotectedUriRegexSet = Set.of(
            "/api/auth/login",
            "/api/auth/signup",
            "/api/auth/refresh",
            "/v3/api-docs.*",
            "/swagger-ui.*",
            "/favicon.ico"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            if (!requestUriMatchesUnprotectedUriMasks(request.getRequestURI())) {
                Cookie[] cookiesArray = request.getCookies() == null ? new Cookie[0] : request.getCookies();
                Optional<Cookie> refreshTokenCookie = Arrays.stream(cookiesArray).filter(cookie -> cookie.getName().equals("refresh_token")).findFirst();
                if (refreshTokenCookie.isEmpty()) {
                    throw new CookieFilterException("The request to " + request.getRequestURI() + " is missing some required cookies.");
                } else {
                    Cookie cookie = refreshTokenCookie.get();
                    if (cookie.getValue() == null) {
                        throw new CookieFilterException("The request to " + request.getRequestURI() + " is missing the refresh token cookie.");
                    }
                }
            }
        } catch (CookieFilterException e) {
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            logger.error(e.getMessage());
            throw new GenericAuthenticationException(e.getMessage());
        }
        filterChain.doFilter(request, response);
    }

    private boolean requestUriMatchesUnprotectedUriMasks(String requestURI) {
        return unprotectedUriRegexSet.stream()
                .map(regex -> requestURI.matches(regex))
                .reduce(false, (subres, item) -> subres ? subres : item);
    }
}
