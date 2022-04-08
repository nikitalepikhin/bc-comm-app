package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.model.StatusLookup;
import com.nikitalepikhin.bccommapp.model.StatusValueType;
import com.nikitalepikhin.bccommapp.repository.StatusRepository;
import com.nikitalepikhin.bccommapp.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public StatusLookup findByValue(StatusValueType value) throws EntityNotFoundException {
        return statusRepository.findByStatusValue(value).orElseThrow(() -> new EntityNotFoundException("Could not find a status with the value of " + value.getStatus()));
    }
}
