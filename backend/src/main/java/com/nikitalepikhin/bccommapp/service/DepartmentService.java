package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.model.Department;

import java.util.UUID;

public interface DepartmentService {
    Department findByUuid(UUID departmentUuid);
}
