package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.StatusLookup;
import com.nikitalepikhin.bccommapp.model.StatusValueType;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface StatusRepository extends CrudRepository<StatusLookup, Integer> {

    Optional<StatusLookup> findByStatusValue(StatusValueType valueType);
}
