package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.service.CookieService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

@Service
public class CookieServiceImpl implements CookieService {

    @Value("${server.ssl.enabled}")
    private boolean httpsEnabled;

    @Value("${server.domain}")
    private String cookieDomain;

    @Override
    public Cookie buildRefreshTokenHttpOnlyCookie(String refreshToken) {
        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(httpsEnabled);
        cookie.setDomain(cookieDomain);
        return cookie;
    }

    @Override
    public Cookie buildExpiredRefreshTokenCookie() {
        Cookie cookie = new Cookie("refresh_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(httpsEnabled);
        cookie.setDomain(cookieDomain);
        cookie.setMaxAge(0);
        return cookie;
    }
}
