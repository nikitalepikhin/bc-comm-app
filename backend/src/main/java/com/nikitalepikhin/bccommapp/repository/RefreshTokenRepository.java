package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model_OLD.RefreshToken_OLD;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken_OLD, Long> {

    RefreshToken_OLD findByRefreshTokenAndFamilyId(String refreshToken, String familyId);

    @Transactional
    void deleteAllByFamilyId (String familyId);
}
