package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.LogInUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.LogInUserResponseDto;

public interface LoginService {

    LogInUserResponseDto loginUser(LogInUserRequestDto logInUserRequestDto);
}
