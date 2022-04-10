package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.AuthorityLookup;
import com.nikitalepikhin.bccommapp.model.AuthorityValueType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AuthorityRepository extends CrudRepository<AuthorityLookup, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM authority_lookup WHERE authority_lookup.authority_value=#{#authorityValueType.name()}")
    Optional<AuthorityLookup> findByAuthorityValue(AuthorityValueType authorityValueType);

    void deleteByAuthorityValue(AuthorityValueType authorityValueType);
}
