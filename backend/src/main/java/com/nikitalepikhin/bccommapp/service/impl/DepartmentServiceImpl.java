package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.model.Department;
import com.nikitalepikhin.bccommapp.repository.DepartmentRepository;
import com.nikitalepikhin.bccommapp.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.UUID;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public Optional<Department> findByUuid(UUID departmentUuid) throws EntityNotFoundException {
        return departmentRepository.findByUuid(departmentUuid);
    }
}
