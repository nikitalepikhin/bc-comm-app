package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.model.School;

import java.util.Optional;
import java.util.UUID;

public interface SchoolService {

    Optional<School> findByUuid(UUID schoolUuid);

    Iterable<School> getAllSchools();

    Iterable<School> getAllMatchingSchools(String substring);
}
