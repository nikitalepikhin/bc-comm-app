package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.model.Department;
import com.nikitalepikhin.bccommapp.model.School;
import com.nikitalepikhin.bccommapp.repository.DepartmentRepository;
import com.nikitalepikhin.bccommapp.service.DepartmentService;
import com.nikitalepikhin.bccommapp.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final SchoolService schoolService;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository, SchoolService schoolService) {
        this.departmentRepository = departmentRepository;
        this.schoolService = schoolService;
    }

    @Override
    public Optional<Department> findByUuid(UUID departmentUuid) throws EntityNotFoundException {
        return departmentRepository.findByUuid(departmentUuid);
    }

    @Override
    public Iterable<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Iterable<Department> getAllMatchingDepartments(String substring, UUID schoolUuid) {
        Optional<School> school = schoolService.findByUuid(schoolUuid);
        List<Department> result = new ArrayList<>();
        if (school.isPresent()) {
            Iterable<Department> departmentIterable = departmentRepository.findAllBySchool(school.get());
            Iterator<Department> departmentIterator = departmentIterable.iterator();
            Pattern pattern = Pattern.compile(substring, Pattern.CASE_INSENSITIVE);
            departmentIterator.forEachRemaining(department -> {
                Matcher matcher = pattern.matcher(department.getName());
                if (matcher.find()) {
                    result.add(department);
                }
            });

        }
        return result;
    }
}
