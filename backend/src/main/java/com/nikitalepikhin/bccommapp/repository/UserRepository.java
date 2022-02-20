package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Set<User> findAll();
}
