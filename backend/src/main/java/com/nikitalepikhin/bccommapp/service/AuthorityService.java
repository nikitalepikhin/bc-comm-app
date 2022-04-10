package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.exception.EntityAlreadyExistsException;
import com.nikitalepikhin.bccommapp.exception.NonExistentEntityException;
import com.nikitalepikhin.bccommapp.model.AuthorityLookup;
import com.nikitalepikhin.bccommapp.model.AuthorityValueType;

import java.util.Optional;

public interface AuthorityService {

    Optional<AuthorityLookup> findByValue(AuthorityValueType authorityValueType);

    AuthorityLookup createAuthority(AuthorityValueType authorityValueType) throws EntityAlreadyExistsException;

    void deleteAuthority(AuthorityValueType authorityValueType) throws NonExistentEntityException;
}
