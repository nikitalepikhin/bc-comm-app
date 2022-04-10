package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.exception.EntityAlreadyExistsException;
import com.nikitalepikhin.bccommapp.exception.NonExistentEntityException;
import com.nikitalepikhin.bccommapp.model.AuthorityLookup;
import com.nikitalepikhin.bccommapp.model.AuthorityValueType;
import com.nikitalepikhin.bccommapp.model.RoleLookup;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import com.nikitalepikhin.bccommapp.repository.RoleRepository;
import com.nikitalepikhin.bccommapp.service.AuthorityService;
import com.nikitalepikhin.bccommapp.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final AuthorityService authorityService;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository, AuthorityService authorityService) {
        this.roleRepository = roleRepository;
        this.authorityService = authorityService;
    }

    @Override
    public Optional<RoleLookup> findByValue(RoleValueType roleValueType) {
        return roleRepository.findByRoleValue(roleValueType);
    }

    @Override
    public RoleLookup createRole(RoleValueType roleValueType) throws EntityAlreadyExistsException {
        if (roleRepository.findByRoleValue(roleValueType).isEmpty()) {
            return roleRepository.save(RoleLookup.builder()
                    .uuid(UUID.randomUUID())
                    .roleValue(roleValueType)
                    .build());
        } else {
            log.error("RoleServiceImpl::createRole: could not create role " + roleValueType.name() + " because it already exists.");
            throw new EntityAlreadyExistsException("RoleServiceImpl::createRole: could not create role " + roleValueType.name() + " because it already exists.");
        }
    }

    @Override
    public RoleLookup createRoleWithAssignedAuthorities(RoleValueType roleValueType, AuthorityValueType... authorityValueTypes) throws EntityAlreadyExistsException {
        if (roleRepository.findByRoleValue(roleValueType).isEmpty()) {
            Set<AuthorityLookup> authorities = Arrays.stream(authorityValueTypes)
                    .map(authorityService::findByValue)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toSet()); // will assign only the found authorities and ignore the empty optionals
            return roleRepository.save(RoleLookup.builder()
                    .uuid(UUID.randomUUID())
                    .roleValue(roleValueType)
                    .assignedAuthorities(authorities)
                    .build());
        } else {
            log.error("RoleServiceImpl::createRoleWithAssignedAuthorities: could not create role " + roleValueType.name() + " because it already exists.");
            throw new EntityAlreadyExistsException("RoleServiceImpl::createRoleWithAssignedAuthorities: could not create role " + roleValueType.name() + " because it already exists.");
        }
    }

    @Override
    public void deleteRole(RoleValueType roleValueType) throws NonExistentEntityException {
        if (roleRepository.findByRoleValue(roleValueType).isPresent()) {
            roleRepository.deleteByRoleValue(roleValueType);
        } else {
            log.error("RoleServiceImpl::deleteRole: could not delete role " + roleValueType.name() + " because it does not exist.");
            throw new NonExistentEntityException("RoleServiceImpl::deleteRole: could not delete role " + roleValueType.name() + " because it does not exist.");
        }
    }

    @Override
    public void addAuthorityToRole(AuthorityValueType authorityValue, RoleValueType roleValue) throws NonExistentEntityException {
        Optional<RoleLookup> optionalRole = roleRepository.findByRoleValue(roleValue);
        Optional<AuthorityLookup> optionalAuthority = authorityService.findByValue(authorityValue);
        if (optionalRole.isPresent() && optionalAuthority.isPresent()) {
            RoleLookup role = optionalRole.get();
            AuthorityLookup authority = optionalAuthority.get();
            role.getAssignedAuthorities().add(authority);
            roleRepository.save(role);
        } else {
            if (optionalRole.isEmpty()) {
                log.error("RoleServiceImpl::addAuthorityToRole: role " + roleValue.name() + "does not exist.");
            }
            if (optionalAuthority.isEmpty()) {
                log.error("RoleServiceImpl::addAuthorityToRole: authority " + authorityValue.name() + "does not exist.");
            }
            throw new NonExistentEntityException("RoleServiceImpl::addAuthorityToRole: could not add authority " + authorityValue.name() + " to role " + roleValue.name() + " because at least one of them does not exist.");
        }
    }

    @Override
    public boolean removeAuthorityFromRole(AuthorityValueType authorityValue, RoleValueType roleValue) throws NonExistentEntityException {
        Optional<RoleLookup> optionalRole = roleRepository.findByRoleValue(roleValue);
        Optional<AuthorityLookup> optionalAuthority = authorityService.findByValue(authorityValue);
        if (optionalRole.isPresent() && optionalAuthority.isPresent()) {
            RoleLookup role = optionalRole.get();
            AuthorityLookup authority = optionalAuthority.get();
            boolean removed = role.getAssignedAuthorities().remove(authority);
            roleRepository.save(role);
            return removed;
        } else {
            if (optionalRole.isEmpty()) {
                log.error("RoleServiceImpl::removeAuthorityFromRole: role " + roleValue.name() + " does not exist.");
            }
            if (optionalAuthority.isEmpty()) {
                log.error("RoleServiceImpl::removeAuthorityFromRole: authority " + authorityValue.name() + " does not exist.");
            }
            throw new NonExistentEntityException("RoleServiceImpl::removeAuthorityFromRole: could not remove authority " + authorityValue.name() + " from role " + roleValue.name() + " because at least one of them does not exist.");
        }
    }

    @Override
    public Set<RoleLookup> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public RoleLookup findByUuid(UUID uuid) throws NonExistentEntityException {
        Optional<RoleLookup> optionalRole = roleRepository.findByUuid(uuid);
        if (optionalRole.isEmpty()) {
            log.error("RoleServiceImpl::findByUuid: could not find a role with UUID " + uuid.toString()+ ".");
            throw new NonExistentEntityException("RoleServiceImpl::findByUuid: could not find a role with UUID " + uuid.toString()+ ".");
        } else {
            return optionalRole.get();
        }
    }

    @Override
    public void deleteRoleByUuid(UUID uuid) throws NonExistentEntityException {
        if (roleRepository.findByUuid(uuid).isPresent()) {
            roleRepository.deleteByUuid(uuid);
        } else {
            log.error("RoleServiceImpl::deleteRoleByUuid: could not delete a role with UUID " + uuid.toString() + ".");
            throw new NonExistentEntityException("RoleServiceImpl::deleteRoleByUuid: could not delete a role with UUID " + uuid.toString() + ".");
        }
    }
}
