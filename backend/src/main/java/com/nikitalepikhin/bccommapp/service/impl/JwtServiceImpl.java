package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RefreshTokenResponseDto;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.model.Role;
import com.nikitalepikhin.bccommapp.security.JwtProvider;
import com.nikitalepikhin.bccommapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceImpl implements JwtService {

    private final JwtProvider jwtProvider;

    @Autowired
    public JwtServiceImpl(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public RefreshTokenResponseDto refreshToken(String refreshToken) {
        if (jwtProvider.validateToken(refreshToken)) {
            String email = jwtProvider.getEmail(refreshToken);
            Role role = jwtProvider.getRole(refreshToken);
            String newRefreshToken = jwtProvider.createToken(email, role, false);
            String newAccessToken = jwtProvider.createToken(email, role, true);
            return new RefreshTokenResponseDto(newAccessToken, newRefreshToken);
        } else {
            throw new RefreshTokenException("Provided refresh token is invalid.");
        }
    }
}
