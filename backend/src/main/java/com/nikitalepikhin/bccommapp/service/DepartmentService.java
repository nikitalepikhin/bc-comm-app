package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.model.Department;

import java.util.Optional;
import java.util.UUID;

public interface DepartmentService {

    Optional<Department> findByUuid(UUID departmentUuid);
}
