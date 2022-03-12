package com.nikitalepikhin.bccommapp.security;

import com.nikitalepikhin.bccommapp.exception.CookieFilterException;
import com.nikitalepikhin.bccommapp.exception.GenericAuthenticationException;
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

@Component
public class CookieFilter extends OncePerRequestFilter {

    private final Set<String> unprotectedUrisSet = Set.of(
            "/api/auth/login",
            "/api/auth/register"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            System.out.println(Arrays.toString(request.getCookies()));
            if (!this.unprotectedUrisSet.contains(request.getRequestURI())) {
                Optional<Cookie> refreshTokenCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals("refresh_token")).findFirst();
                if (refreshTokenCookie.isEmpty()) {
                    throw new CookieFilterException("The request is missing some required cookies.");
                } else {
                    Cookie cookie = refreshTokenCookie.get();
                    if (cookie.getValue() == null) {
                        throw new CookieFilterException("The request is missing some required cookies.");
                    }
                }
            }
        } catch (CookieFilterException e) {
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            throw new GenericAuthenticationException(e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
}
