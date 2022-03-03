package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RegisterUserDto;
import com.nikitalepikhin.bccommapp.service.RegistrationService;
import com.nikitalepikhin.bccommapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final UserService userService;

    @Autowired
    public RegistrationServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void registerUser(RegisterUserDto registerUserDto) {
        userService.register(registerUserDto);
    }
}
