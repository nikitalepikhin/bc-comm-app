package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.*;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.service.CookieService;
import com.nikitalepikhin.bccommapp.service.JwtService;
import com.nikitalepikhin.bccommapp.service.LoginService;
import com.nikitalepikhin.bccommapp.service.RegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Authentication Controller")
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
    @Operation(summary = "Log in user")
    public ResponseEntity<LogInUserResponseDto> logInUser(@RequestBody LogInUserRequestDto request, HttpServletResponse httpServletResponse) {
        try {
            LogInUserDto logInUserDto = loginService.loginUser(request);
            httpServletResponse.addCookie(cookieService.buildRefreshTokenHttpOnlyCookie(logInUserDto.getRefreshToken()));
            return ResponseEntity.ok(logInUserDto.getLogInUserResponseDto());
        } catch (AuthenticationException e) {
            System.out.println(e.getMessage());
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/signup")
    @Operation(summary = "Register user")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserRequestDto request) {
        registrationService.registerUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token")
    public ResponseEntity<RefreshTokenResponseDto> refreshToken(@Parameter(hidden = true) @CookieValue(value = "refresh_token") String refreshToken, HttpServletResponse httpServletResponse) {
        try {
            RefreshTokenDto refreshTokenDto = jwtService.refreshAccessToken(refreshToken);
            httpServletResponse.addCookie(cookieService.buildRefreshTokenHttpOnlyCookie(refreshTokenDto.getRefreshToken()));
            return ResponseEntity.ok().body(refreshTokenDto.getRefreshTokenResponseDto());
        } catch (RefreshTokenException e) {
            log.warn(e.getMessage());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Log out user",
            parameters = {@Parameter(name = "Authorization", in = ParameterIn.HEADER, schema = @Schema(implementation = String.class), required = true)})
    public ResponseEntity<?> logOutUser(@Parameter(hidden = true) @CookieValue(value = "refresh_token") String refreshToken, HttpServletResponse httpServletResponse) {
        jwtService.logOut(refreshToken);
        httpServletResponse.addCookie(cookieService.buildExpiredRefreshTokenCookie());
        return ResponseEntity.ok().build();
    }
}
