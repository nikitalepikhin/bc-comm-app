package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RegisterUserRequestDto;
import com.nikitalepikhin.bccommapp.model_OLD.User_OLD;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    User_OLD register(RegisterUserRequestDto userDto);

    Set<User_OLD> getAll();

    Optional<User_OLD> findByUsername(String username);

    Optional<User_OLD> findByEmail(String email);

    Optional<User_OLD> findById(Long id);

    void deleteById(Long id);
}
