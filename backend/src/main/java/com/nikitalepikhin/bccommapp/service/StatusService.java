package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.exception.EntityAlreadyExistsException;
import com.nikitalepikhin.bccommapp.model.StatusLookup;
import com.nikitalepikhin.bccommapp.model.StatusValueType;

import java.util.Optional;

public interface StatusService {

    Optional<StatusLookup> findByValue(StatusValueType statusValueType);

    StatusLookup createStatus(StatusValueType statusValueType) throws EntityAlreadyExistsException;
}
