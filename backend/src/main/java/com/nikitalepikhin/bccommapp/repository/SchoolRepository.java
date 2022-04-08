package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.School;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface SchoolRepository extends CrudRepository<School, Long> {

    Optional<School> findByUuid(UUID uuid);
}
