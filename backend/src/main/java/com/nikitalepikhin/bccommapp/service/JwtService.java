package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RefreshTokenResponseDto;

public interface JwtService {

    RefreshTokenResponseDto refreshToken(String refreshToken);
}
