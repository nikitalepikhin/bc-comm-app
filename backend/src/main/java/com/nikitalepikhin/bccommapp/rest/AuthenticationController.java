package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.*;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.service.CookieService;
import com.nikitalepikhin.bccommapp.service.JwtService;
import com.nikitalepikhin.bccommapp.service.LoginService;
import com.nikitalepikhin.bccommapp.service.RegistrationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping(("/api/auth"))
@Api(value = "Authentication Controller")
public class AuthenticationController {

    private final JwtService jwtService;

    private final CookieService cookieService;

    private final RegistrationService registrationService;

    private final LoginService loginService;

    @Autowired
    public AuthenticationController(
            JwtService jwtService,
            CookieService cookieService,
            RegistrationService registrationService,
            LoginService loginService) {
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.registrationService = registrationService;
        this.loginService = loginService;
    }

    @PostMapping("/login")
    @ApiOperation(value = "Log in user")
    public ResponseEntity<LogInUserResponseDto> logInUser(@RequestBody LogInUserRequestDto request, HttpServletResponse httpServletResponse) {
        log.info("Login request from " + request.getEmail());
        try {
            LogInUserDto logInUserDto = loginService.loginUser(request);
            log.info("Login from " + request.getEmail() + " ok");
            httpServletResponse.addCookie(cookieService.buildRefreshTokenHttpOnlyCookie(logInUserDto.getRefreshToken()));
            return ResponseEntity.ok(logInUserDto.getLogInUserResponseDto());
        } catch (AuthenticationException e) {
            log.info("Login from " + request.getEmail() + " forbidden");
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/signup")
    @ApiOperation(value = "Register user")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserRequestDto request) {
        log.info("Signup request from " + request.getEmail());
        registrationService.registerUser(request);
        return ResponseEntity.ok("Successful registration.");
    }

    @PostMapping("/refresh")
    @PreAuthorize("isAuthenticated()")
    @ApiOperation(value = "Refresh the access token using a refresh token")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refresh_token") String refresh_token, HttpServletResponse httpServletResponse) {
        try {
            RefreshTokenDto refreshTokenDto = jwtService.refreshAccessToken(refresh_token);
            httpServletResponse.addCookie(cookieService.buildRefreshTokenHttpOnlyCookie(refreshTokenDto.getRefreshToken()));
            return ResponseEntity.ok(refreshTokenDto.getRefreshTokenResponseDto());
        } catch (RefreshTokenException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    @ApiOperation(value = "Log out user")
    public ResponseEntity<?> logOutUser(@CookieValue(value = "refresh_token") String refresh_token, HttpServletResponse httpServletResponse) {
        jwtService.logOut(refresh_token);
        httpServletResponse.addCookie(cookieService.buildExpiredRefreshTokenCookie());
        return ResponseEntity.ok().build();
    }
}
