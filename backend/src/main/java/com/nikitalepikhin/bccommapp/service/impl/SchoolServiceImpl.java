package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.model.School;
import com.nikitalepikhin.bccommapp.repository.SchoolRepository;
import com.nikitalepikhin.bccommapp.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.UUID;

@Service
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    @Autowired
    public SchoolServiceImpl(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @Override
    public School findByUuid(UUID schoolUuid) throws EntityNotFoundException {
        return schoolRepository.findByUuid(schoolUuid).orElseThrow(() -> new EntityNotFoundException("School entity with the provided UUID " + schoolUuid.toString() + " could not be found."));
    }
}
