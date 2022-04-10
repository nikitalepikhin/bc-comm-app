package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.auth.*;
import com.nikitalepikhin.bccommapp.exception.GenericAuthenticationException;
import com.nikitalepikhin.bccommapp.exception.NonExistentEntityException;
import com.nikitalepikhin.bccommapp.model.*;
import com.nikitalepikhin.bccommapp.repository.RepresentativeRepository;
import com.nikitalepikhin.bccommapp.repository.TeacherRepository;
import com.nikitalepikhin.bccommapp.repository.UserRepository;
import com.nikitalepikhin.bccommapp.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final RepresentativeRepository representativeRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final SchoolService schoolService;
    private final DepartmentService departmentService;
    private final StatusService statusService;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, TeacherRepository teacherRepository, RepresentativeRepository representativeRepository,
                           PasswordEncoder passwordEncoder, RoleService roleService, SchoolService schoolService, DepartmentService departmentService,
                           StatusService statusService, UserDetailsService userDetailsService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.representativeRepository = representativeRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.schoolService = schoolService;
        this.departmentService = departmentService;
        this.statusService = statusService;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    private String generateUsername() {
        return Long.toString(Long.parseLong(Long.toString(new Random().nextLong()), 10), 36).substring(1, 9);
    }

    @Override
    public Set<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByBaseEntityUserUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByBaseEntityUserEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) throws NonExistentEntityException {
        Optional<User> user = findById(id);
        Optional<StatusLookup> disabledStatus = statusService.findByValue(StatusValueType.DISABLED);
        if (user.isPresent() && disabledStatus.isPresent()) {
            user.get().getBaseEntityUser().setStatus(disabledStatus.get());
            userRepository.save(user.get());
        } else {
            if (user.isEmpty()) {
                log.warn("UserServiceImpl::deleteById: User with ID " + id + " does not exist.");
            }
            if (disabledStatus.isEmpty()) {
                log.error("UserServiceImpl::deleteById: DISABLED status does not exist.");
            }
            throw new NonExistentEntityException(String.format("UserServiceImpl::deleteById: could not delete a user with ID %d.", id));
        }
    }

    @Override
    public User registerSimpleUser(RegisterSimpleUserRequestDto request, RoleValueType roleValueType) throws NonExistentEntityException {
        Optional<RoleLookup> role = roleService.findByValue(roleValueType);
        Optional<StatusLookup> activeStatus = statusService.findByValue(StatusValueType.ACTIVE);
        if (role.isPresent() && activeStatus.isPresent()) {
            User user = User.builder()
                    .baseEntityUser(BaseEntityUser.builder()
                            .username(generateUsername())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .uuid(UUID.randomUUID())
                            .status(activeStatus.get())
                            .role(role.get())
                            .build())
                    .build();
            return userRepository.save(user);
        } else {
            if (role.isEmpty()) {
                log.error(String.format("UserServiceImpl::registerSimpleUser: %s role does not exist.", roleValueType));
            }
            if (activeStatus.isEmpty()) {
                log.error("UserServiceImpl::registerSimpleUser: ACTIVE status does not exist.");
            }
            throw new NonExistentEntityException(String.format("UserServiceImpl::registerSimpleUser: could not create a simple user with role of %s.", roleValueType));
        }
    }

    @Override
    public User registerTeacherUser(RegisterTeacherUserRequestDto request) throws NonExistentEntityException {
        Optional<RoleLookup> role = roleService.findByValue(RoleValueType.TEACHER);
        Optional<StatusLookup> activeStatus = statusService.findByValue(StatusValueType.ACTIVE);
        Optional<School> school = schoolService.findByUuid(request.getSchoolUuid());
        Optional<Department> department = departmentService.findByUuid(request.getDepartmentUuid());
        if (role.isPresent() && activeStatus.isPresent() && school.isPresent() && department.isPresent()) {
            Teacher teacher = Teacher.builder()
                    .baseEntityUser(BaseEntityUser.builder()
                            .username(generateUsername())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .uuid(UUID.randomUUID())
                            .status(activeStatus.get())
                            .role(role.get())
                            .build())
                    .baseEntityNamedUser(BaseEntityNamedUser.builder()
                            .name(request.getName())
                            .build())
                    .baseEntityEmployee(BaseEntityEmployee.builder()
                            .school(school.get())
                            .department(department.get())
                            .build())
                    .build();
            Teacher savedTeacher = teacherRepository.save(teacher);
            return findById(savedTeacher.getId()).get();
        } else {
            if (role.isEmpty()) {
                log.error("UserServiceImpl::registerTeacherUser: TEACHER role does not exist.");
            }
            if (activeStatus.isEmpty()) {
                log.error("UserServiceImpl::registerTeacherUser: ACTIVE status does not exist.");
            }
            if (school.isEmpty()) {
                log.warn(String.format("UserServiceImpl::registerTeacherUser: school with UUID %s does not exist.", request.getSchoolUuid().toString()));
            }
            if (department.isEmpty()) {
                log.warn(String.format("UserServiceImpl::registerTeacherUser: department with UUID %s does not exist.", request.getDepartmentUuid().toString()));
            }
            throw new NonExistentEntityException("UserServiceImpl::registerTeacherUser: could not create a teacher user.");
        }
    }

    @Override
    public User registerRepresentativeUser(RegisterRepresentativeUserRequestDto request) throws NonExistentEntityException {
        Optional<RoleLookup> role = roleService.findByValue(RoleValueType.REPRESENTATIVE);
        Optional<StatusLookup> activeStatus = statusService.findByValue(StatusValueType.ACTIVE);
        Optional<School> school = schoolService.findByUuid(request.getSchoolUuid());
        if (role.isPresent() && activeStatus.isPresent() && school.isPresent()) {
            Representative representative = Representative.builder()
                    .baseEntityUser(BaseEntityUser.builder()
                            .username(generateUsername())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .uuid(UUID.randomUUID())
                            .status(activeStatus.get())
                            .role(role.get())
                            .build())
                    .baseEntityEmployee(BaseEntityEmployee.builder()
                            .school(school.get())
                            .build())
                    .build();
            Representative savedRepresentative = representativeRepository.save(representative);
            return findById(savedRepresentative.getId()).get();
        } else {
            if (role.isEmpty()) {
                log.error("UserServiceImpl::registerRepresentativeUser: TEACHER role does not exist.");
            }
            if (activeStatus.isEmpty()) {
                log.error("UserServiceImpl::registerRepresentativeUser: ACTIVE status does not exist.");
            }
            if (school.isEmpty()) {
                log.warn(String.format("UserServiceImpl::registerRepresentativeUser: school with UUID %s does not exist.", request.getSchoolUuid().toString()));
            }
            throw new NonExistentEntityException("UserServiceImpl::registerRepresentativeUser: could not create a teacher user.");
        }
    }

    @Override
    public LogInUserDto loginUser(LogInUserRequestDto logInUserRequestDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                logInUserRequestDto.getEmail(),
                logInUserRequestDto.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(logInUserRequestDto.getEmail());
        User user = findByEmail(logInUserRequestDto.getEmail())
                .orElseThrow(() -> new GenericAuthenticationException("Provided email does not match any user."));
        String accessToken = jwtService.createAccessToken(userDetails.getUsername(), user.getBaseEntityUser().getRole().getRoleValue());
        String refreshToken = jwtService.createRefreshTokenForNewFamily(userDetails.getUsername(), user.getBaseEntityUser().getRole().getRoleValue());
        return new LogInUserDto(user.getBaseEntityUser().getEmail(), user.getBaseEntityUser().getUsername(), accessToken, refreshToken);
    }

    @Override
    public String getUserUsername(String email) {
        return findByEmail(email).get().getBaseEntityUser().getUsername();
    }
}
