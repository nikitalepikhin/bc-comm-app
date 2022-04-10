package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.RoleLookup;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface RoleRepository extends CrudRepository<RoleLookup, Integer> {

    Set<RoleLookup> findAll();

    Optional<RoleLookup> findByRoleValue(RoleValueType roleValueType);

    void deleteByRoleValue(RoleValueType value);

    Optional<RoleLookup> findByUuid(UUID uuid);

    void deleteByUuid(UUID uuid);
}
