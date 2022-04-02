package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model_OLD.User_OLD;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends CrudRepository<User_OLD, Long> {

    Optional<User_OLD> findByUsername(String username);

    Optional<User_OLD> findByEmail(String email);

    Set<User_OLD> findAll();
}
