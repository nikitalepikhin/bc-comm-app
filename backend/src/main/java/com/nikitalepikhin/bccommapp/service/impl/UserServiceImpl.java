package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RegisterRepresentativeUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.RegisterSimpleUserRequestDto;
import com.nikitalepikhin.bccommapp.dto.RegisterTeacherUserRequestDto;
import com.nikitalepikhin.bccommapp.model.*;
import com.nikitalepikhin.bccommapp.repository.RepresentativeRepository;
import com.nikitalepikhin.bccommapp.repository.TeacherRepository;
import com.nikitalepikhin.bccommapp.repository.UserRepository;
import com.nikitalepikhin.bccommapp.service.*;
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
    private final TeacherRepository teacherRepository;
    private final RepresentativeRepository representativeRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final SchoolService schoolService;
    private final DepartmentService departmentService;
    private final StatusService statusService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, TeacherRepository teacherRepository, RepresentativeRepository representativeRepository, PasswordEncoder passwordEncoder,
                           RoleService roleService, SchoolService schoolService, DepartmentService departmentService, StatusService statusService) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.representativeRepository = representativeRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.schoolService = schoolService;
        this.departmentService = departmentService;
        this.statusService = statusService;
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
    public void deleteById(Long id) {
        Optional<User> user = findById(id);
        if (user.isPresent()) {
            StatusLookup disabledStatus = statusService.findByValue(StatusValueType.DISABLED);
            user.get().getBaseEntityUser().setStatus(disabledStatus);
            userRepository.save(user.get());
        }
    }

    @Override
    public User registerSimpleUser(RegisterSimpleUserRequestDto request, RoleValueType roleValueType) {
        RoleLookup role = roleService.findByValue(roleValueType);
        StatusLookup activeStatus = statusService.findByValue(StatusValueType.ACTIVE);
        User user = User.builder()
                .baseEntityUser(BaseEntityUser.builder()
                        .username(generateUsername())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .uuid(UUID.randomUUID())
                        .status(activeStatus)
                        .role(role)
                        .build())
                .build();
        return userRepository.save(user);
    }

    @Override
    public User registerTeacherUser(RegisterTeacherUserRequestDto request) {
        RoleLookup role = roleService.findByValue(RoleValueType.TEACHER);
        StatusLookup activeStatus = statusService.findByValue(StatusValueType.ACTIVE);
        School school = schoolService.findByUuid(request.getSchoolUuid());
        Department department = request.getDepartmentUuid() != null ? departmentService.findByUuid(request.getDepartmentUuid()) : null;
        Teacher teacher = Teacher.builder()
                .baseEntityUser(BaseEntityUser.builder()
                        .username(generateUsername())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .uuid(UUID.randomUUID())
                        .status(activeStatus)
                        .role(role)
                        .build())
                .baseEntityNamedUser(BaseEntityNamedUser.builder()
                        .name(request.getName())
                        .build())
                .baseEntityEmployee(BaseEntityEmployee.builder()
                        .school(school)
                        .department(department)
                        .build())
                .build();
        Teacher savedTeacher = teacherRepository.save(teacher);
        return findById(savedTeacher.getId()).get();
    }

    @Override
    public User registerRepresentativeUser(RegisterRepresentativeUserRequestDto request) {
        RoleLookup role = roleService.findByValue(RoleValueType.REPRESENTATIVE);
        StatusLookup activeStatus = statusService.findByValue(StatusValueType.ACTIVE);
        School school = schoolService.findByUuid(request.getSchoolUuid());
        Representative representative = Representative.builder()
                .baseEntityUser(BaseEntityUser.builder()
                        .username(generateUsername())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .uuid(UUID.randomUUID())
                        .status(activeStatus)
                        .role(role)
                        .build())
                .baseEntityEmployee(BaseEntityEmployee.builder()
                        .school(school)
                        .build())
                .build();
        Representative savedRepresentative = representativeRepository.save(representative);
        return findById(savedRepresentative.getId()).get();
    }
}
