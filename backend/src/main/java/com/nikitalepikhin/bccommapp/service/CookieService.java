package com.nikitalepikhin.bccommapp.service;

import javax.servlet.http.Cookie;

public interface CookieService {

    Cookie buildRefreshTokenHttpOnlyCookie(String refreshToken);

    Cookie buildExpiredRefreshTokenCookie();

}
