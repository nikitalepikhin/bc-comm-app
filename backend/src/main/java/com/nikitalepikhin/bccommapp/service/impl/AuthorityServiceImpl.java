package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.exception.EntityAlreadyExistsException;
import com.nikitalepikhin.bccommapp.exception.NonExistentEntityException;
import com.nikitalepikhin.bccommapp.model.AuthorityLookup;
import com.nikitalepikhin.bccommapp.model.AuthorityValueType;
import com.nikitalepikhin.bccommapp.repository.AuthorityRepository;
import com.nikitalepikhin.bccommapp.service.AuthorityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityServiceImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    public Optional<AuthorityLookup> findByValue(AuthorityValueType authorityValueType) {
        return authorityRepository.findByAuthorityValue(authorityValueType);
    }

    @Override
    public AuthorityLookup createAuthority(AuthorityValueType authorityValueType) throws EntityAlreadyExistsException {
        if (authorityRepository.findByAuthorityValue(authorityValueType).isEmpty()) {
            return authorityRepository.save(AuthorityLookup.builder()
                    .uuid(UUID.randomUUID())
                    .authorityValue(authorityValueType)
                    .build());
        } else {
            log.warn("AuthorityServiceImpl::createAuthority: could not create a new authority " + authorityValueType.name() + " because it already exists.");
            throw new EntityAlreadyExistsException("AuthorityServiceImpl::createAuthority: could not create authority " + authorityValueType.name() + " because it already exists.");
        }
    }

    @Override
    public void deleteAuthority(AuthorityValueType authorityValueType) throws NonExistentEntityException {
        if (authorityRepository.findByAuthorityValue(authorityValueType).isPresent()) {
            authorityRepository.deleteByAuthorityValue(authorityValueType);
        } else {
            log.warn("AuthorityServiceImpl::createAuthority: could not delete authority " + authorityValueType.name() + " because it does not exist.");
            throw new NonExistentEntityException("AuthorityServiceImpl::createAuthority: could not delete authority " + authorityValueType.name() + " because it does not exist.");
        }
    }
}
