package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.model.School;
import com.nikitalepikhin.bccommapp.repository.SchoolRepository;
import com.nikitalepikhin.bccommapp.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    @Autowired
    public SchoolServiceImpl(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @Override
    public Optional<School> findByUuid(UUID schoolUuid) throws EntityNotFoundException {
        return schoolRepository.findByUuid(schoolUuid);
    }

    @Override
    public Iterable<School> getAllSchools() {
        return schoolRepository.findAll();
    }

    @Override
    public Iterable<School> getAllMatchingSchools(String substring) {
        Iterable<School> schoolIterable = schoolRepository.findAll();
        Iterator<School> schoolIterator = schoolIterable.iterator();
        List<School> result = new ArrayList<>();
        Pattern pattern = Pattern.compile(substring, Pattern.CASE_INSENSITIVE);
        schoolIterator.forEachRemaining(school -> {
            Matcher matcher = pattern.matcher(school.getName());
            if (matcher.find()) {
                result.add(school);
            }
        });
        return result;
    }

}
