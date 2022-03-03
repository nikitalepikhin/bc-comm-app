package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.AuthenticateUserDto;
import com.nikitalepikhin.bccommapp.model.User;
import com.nikitalepikhin.bccommapp.security.JwtProvider;
import com.nikitalepikhin.bccommapp.exception.GenericAuthenticationException;
import com.nikitalepikhin.bccommapp.service.LoginService;
import com.nikitalepikhin.bccommapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    private final JwtProvider jwtProvider;

    @Autowired
    public LoginServiceImpl(
            AuthenticationManager authenticationManager,
            @Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService,
            UserService userService,
            JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public Map<String, String> loginUser(AuthenticateUserDto authenticateUserDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticateUserDto.getEmail(),
                authenticateUserDto.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticateUserDto.getEmail());
        User user = userService.findByEmail(authenticateUserDto.getEmail())
                .orElseThrow(() -> new GenericAuthenticationException("Provided email does not match any user."));
        String accessToken = jwtProvider.createToken(userDetails.getUsername(), user.getRole(), true);
        String refreshToken = jwtProvider.createToken(userDetails.getUsername(), user.getRole(), false);
        return Map.of(
                "email", user.getEmail(),
                "username", user.getUsername(),
                "access_token", accessToken,
                "refresh_token", refreshToken);
    }
}
