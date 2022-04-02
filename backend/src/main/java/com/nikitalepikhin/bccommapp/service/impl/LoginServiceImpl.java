package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.LogInUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.LogInUserDto;
import com.nikitalepikhin.bccommapp.exception.GenericAuthenticationException;
import com.nikitalepikhin.bccommapp.model_OLD.User_OLD;
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
            JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Override
    public LogInUserDto loginUser(LogInUserRequestDto logInUserRequestDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                logInUserRequestDto.getEmail(),
                logInUserRequestDto.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(logInUserRequestDto.getEmail());
        User_OLD userOLD = userService.findByEmail(logInUserRequestDto.getEmail())
                .orElseThrow(() -> new GenericAuthenticationException("Provided email does not match any user."));
        String accessToken = jwtService.createAccessToken(userDetails.getUsername(), userOLD.getRoleOLD());
        String refreshToken = jwtService.createRefreshTokenForNewFamily(userDetails.getUsername(), userOLD.getRoleOLD());
        return new LogInUserDto(userOLD.getEmail(), userOLD.getUsername(), accessToken, refreshToken);
    }

    @Override
    public String getUserUsername(String email) {
        return userService.findByEmail(email).get().getUsername();
    }
}
