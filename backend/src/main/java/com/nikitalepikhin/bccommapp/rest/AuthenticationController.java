package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.AuthenticateUserDto;
import com.nikitalepikhin.bccommapp.model.User;
import com.nikitalepikhin.bccommapp.security.JwtProvider;
import com.nikitalepikhin.bccommapp.security.exception.GenericAuthenticationException;
import com.nikitalepikhin.bccommapp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(("/api/auth"))
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    private final JwtProvider jwtProvider;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(
            AuthenticationManager authenticationManager,
            @Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService,
            UserService userService,
            JwtProvider jwtProvider,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticateUserDto authenticateUserDto) {
        log.info("Got a login request");
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticateUserDto.getEmail(),
                    authenticateUserDto.getPassword())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(authenticateUserDto.getEmail());
            User user = userService.findByEmail(authenticateUserDto.getEmail())
                    .orElseThrow(() -> new GenericAuthenticationException("Provided email does not match any user."));
            String accessToken = jwtProvider.createToken(userDetails.getUsername(), user.getRole(), true);
            String refreshToken = jwtProvider.createToken(userDetails.getUsername(), user.getRole(), false);
            Map<String, String> responseBody = Map.of(
                    "email", user.getEmail(),
                    "username", user.getUsername(),
                    "access_token", accessToken,
                    "refresh_token", refreshToken);
            log.info("Login " + authenticateUserDto.getEmail() + " ok");
            return ResponseEntity.ok(responseBody);
        } catch (AuthenticationException exception) {
            log.info("Login " + authenticateUserDto.getEmail() + " forbidden");
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    // todo - refresh token route

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public void logOutUser(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler handler = new SecurityContextLogoutHandler();
        handler.logout(request, response, null);
    }
}
