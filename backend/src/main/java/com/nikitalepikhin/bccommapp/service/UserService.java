package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RegisterRepresentativeUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.RegisterSimpleUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.RegisterTeacherUserRequestDto;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import com.nikitalepikhin.bccommapp.model.User;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    Set<User> getAll();

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    void deleteById(Long id);

    User registerSimpleUser(RegisterSimpleUserRequestDto request, RoleValueType role);

    User registerTeacherUser(RegisterTeacherUserRequestDto request);

    User registerRepresentativeUser(RegisterRepresentativeUserRequestDto request);
}
