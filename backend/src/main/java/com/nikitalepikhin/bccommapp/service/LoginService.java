package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.AuthenticateUserDto;

import java.util.Map;

public interface LoginService {

    Map<String, String> loginUser(AuthenticateUserDto authenticateUserDto);
}
