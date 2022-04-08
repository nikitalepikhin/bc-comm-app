package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.*;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import com.nikitalepikhin.bccommapp.service.*;
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
import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(("/api/auth"))
@Tag(name = "Authentication Controller")
public class AuthenticationController {

    private final JwtService jwtService;
    private final CookieService cookieService;
    private final LoginService loginService;
    private final UserService userService;

    @Autowired
    public AuthenticationController(JwtService jwtService, CookieService cookieService, LoginService loginService, UserService userService) {
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.loginService = loginService;
        this.userService = userService;
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

    @PostMapping("/signup/admin")
    @Operation(summary = "Register admin user")
    public ResponseEntity<?> registerAdminUser(@Valid @RequestBody RegisterSimpleUserRequestDto request) {
        userService.registerSimpleUser(request, RoleValueType.ADMIN);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signup/representative")
    @Operation(summary = "Register representative user")
    public ResponseEntity<?> registerRepresentativeUser(@Valid @RequestBody RegisterRepresentativeUserRequestDto request) {
        userService.registerRepresentativeUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signup/teacher")
    @Operation(summary = "Register teacher user")
    public ResponseEntity<?> registerTeacherUser(@Valid @RequestBody RegisterTeacherUserRequestDto request) {
        userService.registerTeacherUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signup/student")
    @Operation(summary = "Register student user")
    public ResponseEntity<?> registerStudentUser(@Valid @RequestBody RegisterSimpleUserRequestDto request) {
        userService.registerSimpleUser(request, RoleValueType.STUDENT);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token")
    public ResponseEntity<RefreshTokenResponseDto> refreshToken(@Parameter(hidden = true) @CookieValue(value = "refresh_token") String refreshToken, HttpServletResponse httpServletResponse) {
        try {
            RefreshTokenDto refreshTokenDto = jwtService.refreshAccessToken(refreshToken);
            httpServletResponse.addCookie(cookieService.buildRefreshTokenHttpOnlyCookie(refreshTokenDto.getRefreshToken()));
            String username = loginService.getUserUsername(refreshTokenDto.getEmail());
            return ResponseEntity.ok().body(new RefreshTokenResponseDto(refreshTokenDto.getAccessToken(), refreshTokenDto.getEmail(), username));
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
