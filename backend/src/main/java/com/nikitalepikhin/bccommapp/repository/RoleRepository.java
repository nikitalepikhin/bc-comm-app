package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.RoleLookup;
import com.nikitalepikhin.bccommapp.model.RoleValueType;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<RoleLookup, Integer> {

    Optional<RoleLookup> findByRoleValue(RoleValueType value);
}
