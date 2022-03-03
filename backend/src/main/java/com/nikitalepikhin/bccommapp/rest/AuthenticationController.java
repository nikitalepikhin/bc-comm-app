package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.AuthenticateUserDto;
import com.nikitalepikhin.bccommapp.dto.RefreshTokenResponseDto;
import com.nikitalepikhin.bccommapp.dto.RefreshTokenRequestDto;
import com.nikitalepikhin.bccommapp.dto.RegisterUserDto;
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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

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
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticateUserDto authenticateUserDto) {
        log.info("Login request from " + authenticateUserDto.getEmail());
        try {
            Map<String, String> responseBody = loginService.loginUser(authenticateUserDto);
            log.info("Login from " + authenticateUserDto.getEmail() + " ok");
            return ResponseEntity.ok(responseBody);
        } catch (AuthenticationException e) {
            log.info("Login from " + authenticateUserDto.getEmail() + " forbidden");
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDto registerUserDto) {
        log.info("Signup request from " + registerUserDto.getEmail());
        registrationService.registerUser(registerUserDto);
        return ResponseEntity.ok("Successful registration.");
    }

    @PostMapping("/refresh")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDto refreshTokenRequestDto) {
        try {
            RefreshTokenResponseDto responseBody = jwtService.refreshToken(refreshTokenRequestDto.getRefreshToken());
            return ResponseEntity.ok(responseBody);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> logOutUser(HttpServletRequest request) {
        try {
            request.logout();
            // todo - invalidate refresh token family here
            return ResponseEntity.ok().build();
        } catch (ServletException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
