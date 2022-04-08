package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.AuthorityLookup;
import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepository extends CrudRepository<AuthorityLookup, Integer> {
}
