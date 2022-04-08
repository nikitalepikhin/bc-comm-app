package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.model.RoleLookup;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import com.nikitalepikhin.bccommapp.repository.RoleRepository;
import com.nikitalepikhin.bccommapp.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public RoleLookup findByValue(RoleValueType role) throws EntityNotFoundException {
        return roleRepository.findByRoleValue(role).orElseThrow(() -> new EntityNotFoundException("Could not find a role with the value of " + role.getRole()));
    }
}
