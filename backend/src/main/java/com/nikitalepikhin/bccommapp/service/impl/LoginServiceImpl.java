package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.LogInUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.LogInUserResponseDto;
import com.nikitalepikhin.bccommapp.exception.GenericAuthenticationException;
import com.nikitalepikhin.bccommapp.model.User;
import com.nikitalepikhin.bccommapp.service.JwtService;
import com.nikitalepikhin.bccommapp.service.LoginService;
import com.nikitalepikhin.bccommapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    private final JwtService jwtService;

    @Autowired
    public LoginServiceImpl(
            AuthenticationManager authenticationManager,
            @Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService,
            UserService userService,
            JwtProvider jwtProvider, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Override
    public LogInUserResponseDto loginUser(LogInUserRequestDto logInUserRequestDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                logInUserRequestDto.getEmail(),
                logInUserRequestDto.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(logInUserRequestDto.getEmail());
        User user = userService.findByEmail(logInUserRequestDto.getEmail())
                .orElseThrow(() -> new GenericAuthenticationException("Provided email does not match any user."));
        String accessToken = jwtService.createAccessToken(userDetails.getUsername(), user.getRole());
        String refreshToken = jwtService.createRefreshTokenForNewFamily(userDetails.getUsername(), user.getRole());
        return new LogInUserResponseDto(user.getEmail(), user.getUsername(), accessToken, refreshToken);
    }
}
