package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.*;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.service.JwtService;
import com.nikitalepikhin.bccommapp.service.LoginService;
import com.nikitalepikhin.bccommapp.service.RegistrationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(("/api/auth"))
public class AuthenticationController {

    private final LoginService loginService;

    private final RegistrationService registrationService;

    private final JwtService jwtService;

    @Autowired
    public AuthenticationController(
            LoginService loginService,
            RegistrationService registrationService,
            JwtService jwtService) {
        this.loginService = loginService;
        this.registrationService = registrationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> logInUser(@RequestBody LogInUserRequestDto request) {
        log.info("Login request from " + request.getEmail());
        try {
            LogInUserResponseDto responseDto = loginService.loginUser(request);
            log.info("Login from " + request.getEmail() + " ok");
            return ResponseEntity.ok(responseDto);
        } catch (AuthenticationException e) {
            log.info("Login from " + request.getEmail() + " forbidden");
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserRequestDto request) {
        log.info("Signup request from " + request.getEmail());
        registrationService.registerUser(request);
        return ResponseEntity.ok("Successful registration.");
    }

    @PostMapping("/refresh")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDto request) {
        try {
            RefreshTokenResponseDto response = jwtService.refreshAccessToken(request.getRefreshToken());
            return ResponseEntity.ok(response);
        } catch (RefreshTokenException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> logOutUser(@RequestBody LogOutRequestDto request) {
        jwtService.logOut(request.getRefreshToken());
        return ResponseEntity.ok().build();
    }
}
