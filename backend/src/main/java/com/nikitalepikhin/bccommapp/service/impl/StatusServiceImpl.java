package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.exception.EntityAlreadyExistsException;
import com.nikitalepikhin.bccommapp.model.StatusLookup;
import com.nikitalepikhin.bccommapp.model.StatusValueType;
import com.nikitalepikhin.bccommapp.repository.StatusRepository;
import com.nikitalepikhin.bccommapp.service.StatusService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public Optional<StatusLookup> findByValue(StatusValueType statusValueType) throws EntityNotFoundException {
        return statusRepository.findByStatusValue(statusValueType);
    }

    @Override
    public StatusLookup createStatus(StatusValueType statusValueType) throws EntityAlreadyExistsException {
        if (statusRepository.findByStatusValue(statusValueType).isEmpty()) {
            return statusRepository.save(StatusLookup.builder()
                    .uuid(UUID.randomUUID())
                    .statusValue(statusValueType)
                    .build());
        } else {
            log.error("StatusServiceImpl::createStatus: could not create status " + statusValueType.name() + " because it already exists.");
            throw new EntityAlreadyExistsException("StatusServiceImpl::createStatus: could not create status " + statusValueType.name() + " because it already exists.");
        }
    }
}
