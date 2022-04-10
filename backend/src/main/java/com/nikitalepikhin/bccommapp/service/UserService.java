package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.auth.*;
import com.nikitalepikhin.bccommapp.exception.NonExistentEntityException;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import com.nikitalepikhin.bccommapp.model.User;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    Set<User> getAll();

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    void deleteById(Long id) throws NonExistentEntityException;

    User registerSimpleUser(RegisterSimpleUserRequestDto request, RoleValueType role) throws NonExistentEntityException;

    User registerTeacherUser(RegisterTeacherUserRequestDto request) throws NonExistentEntityException;

    User registerRepresentativeUser(RegisterRepresentativeUserRequestDto request) throws NonExistentEntityException;

    LogInUserDto loginUser(LogInUserRequestDto logInUserRequestDto);

    String getUserUsername(String email);
}
