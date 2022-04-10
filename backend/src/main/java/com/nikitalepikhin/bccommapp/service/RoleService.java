package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.exception.EntityAlreadyExistsException;
import com.nikitalepikhin.bccommapp.exception.NonExistentEntityException;
import com.nikitalepikhin.bccommapp.model.AuthorityValueType;
import com.nikitalepikhin.bccommapp.model.RoleLookup;
import com.nikitalepikhin.bccommapp.model.RoleValueType;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface RoleService {

    Optional<RoleLookup> findByValue(RoleValueType roleValueType);

    RoleLookup createRole(RoleValueType roleValueType) throws EntityAlreadyExistsException;

    RoleLookup createRoleWithAssignedAuthorities(RoleValueType roleValueType, AuthorityValueType... authorityValueTypes) throws EntityAlreadyExistsException;

    void deleteRole(RoleValueType roleValueType) throws NonExistentEntityException;

    void addAuthorityToRole(AuthorityValueType authorityValue, RoleValueType roleValue) throws NonExistentEntityException;

    boolean removeAuthorityFromRole(AuthorityValueType authorityValue, RoleValueType roleValue) throws NonExistentEntityException;

    Set<RoleLookup> findAll();

    RoleLookup findByUuid(UUID uuid) throws NonExistentEntityException;

    void deleteRoleByUuid(UUID uuid) throws NonExistentEntityException;
}
