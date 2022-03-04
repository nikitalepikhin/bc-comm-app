package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RegisterUserRequestDto;
import com.nikitalepikhin.bccommapp.model.User;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    User register(RegisterUserRequestDto userDto);

    Set<User> getAll();

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    void deleteById(Long id);
}
