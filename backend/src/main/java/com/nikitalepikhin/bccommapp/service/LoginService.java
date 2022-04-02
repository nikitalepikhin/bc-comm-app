package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.LogInUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.LogInUserDto;

public interface LoginService {

    LogInUserDto loginUser(LogInUserRequestDto logInUserRequestDto);

    String getUserUsername(String email);
}
