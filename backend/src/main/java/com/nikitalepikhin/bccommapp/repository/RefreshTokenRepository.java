package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.UUID;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    RefreshToken findByRefreshTokenAndFamilyUuid(String refreshToken, UUID familyUuid);

    @Transactional
    void deleteAllByFamilyUuid(UUID familyId);
}
