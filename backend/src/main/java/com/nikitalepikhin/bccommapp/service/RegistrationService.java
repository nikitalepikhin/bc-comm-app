package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RegisterUserRequestDto;

public interface RegistrationService {

    void registerUser(RegisterUserRequestDto registerUserRequestDto);
}
