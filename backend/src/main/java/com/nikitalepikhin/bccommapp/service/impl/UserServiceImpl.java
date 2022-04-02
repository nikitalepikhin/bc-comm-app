package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RegisterUserRequestDto;
import com.nikitalepikhin.bccommapp.model_OLD.User_OLD;
import com.nikitalepikhin.bccommapp.repository.UserRepository;
import com.nikitalepikhin.bccommapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

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
    public User_OLD register(RegisterUserRequestDto userDto) {
        User_OLD userOLD = User_OLD.builder()
                .username(generateUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .roleOLD(userDto.getRoleOLD())
                .uuid(UUID.randomUUID())
                .build();
        return userRepository.save(userOLD);
    }

    private String generateUsername() {
        return Long.toString(Long.parseLong(Long.toString(new Random().nextLong()), 10), 36).substring(1, 9);
    }

    @Override
    public Set<User_OLD> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User_OLD> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User_OLD> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User_OLD> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        // todo - delete by setting user status to DELETED
    }
}
