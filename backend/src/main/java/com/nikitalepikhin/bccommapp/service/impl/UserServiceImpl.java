package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RegisterUserDto;
import com.nikitalepikhin.bccommapp.model.User;
import com.nikitalepikhin.bccommapp.repository.UserRepository;
import com.nikitalepikhin.bccommapp.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterUserDto userDto) {
        User user = User.builder()
                .username(generateUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .created(Instant.now())
                .modified(Instant.now())
                .build();
        return userRepository.save(user);
    }

    private String generateUsername() {
        return RandomStringUtils.randomAlphabetic(8); // todo - create a service for generating random unique usernames
    }

    @Override
    public Set<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        // todo - delete by setting user status to DELETED
    }
}
