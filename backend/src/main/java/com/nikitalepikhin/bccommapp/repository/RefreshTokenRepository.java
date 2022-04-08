package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    RefreshToken findByRefreshTokenAndFamilyUuid(String refreshToken, String familyUuid);

    @Transactional
    void deleteAllByFamilyUuid(String familyId);
}
