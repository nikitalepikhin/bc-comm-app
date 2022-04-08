package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.model.School;

import java.util.UUID;

public interface SchoolService {
    School findByUuid(UUID schoolUuid);
}
