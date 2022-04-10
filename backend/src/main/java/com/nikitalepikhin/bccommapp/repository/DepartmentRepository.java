package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.Department;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface DepartmentRepository extends CrudRepository<Department, Long> {

    Optional<Department> findByUuid(UUID uuid);
}
