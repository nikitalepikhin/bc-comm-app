package com.nikitalepikhin.bccommapp.service.impl;

import com.nikitalepikhin.bccommapp.dto.RefreshTokenDto;
import com.nikitalepikhin.bccommapp.dto.RefreshTokenResponseDto;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.model.RefreshToken;
import com.nikitalepikhin.bccommapp.model.Role;
import com.nikitalepikhin.bccommapp.repository.RefreshTokenRepository;
import com.nikitalepikhin.bccommapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class JwtServiceImpl implements JwtService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;

    @Autowired
    public JwtServiceImpl(
            JwtProvider jwtProvider,
            RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public RefreshTokenDto refreshAccessToken(String oldRefreshToken) throws RefreshTokenException {
        if (validateToken(oldRefreshToken) && refreshTokenExists(oldRefreshToken)) {
            Optional<String> email = getEmail(oldRefreshToken);
            Optional<Role> role = getRole(oldRefreshToken);
            if (email.isPresent() && role.isPresent()) {
                if (!refreshTokenHasBeenUsed(oldRefreshToken)) {
                    String newAccessToken = createAccessToken(email.get(), role.get());
                    String newRefreshToken = createRefreshTokenForExistingFamily(oldRefreshToken);
                    return new RefreshTokenDto(newAccessToken, newRefreshToken);
                } else {
                    invalidateTokenFamily(oldRefreshToken);
                    throw new RefreshTokenException("Refresh token reuse detected.");
                }
            } else {
                throw new RefreshTokenException("Email or role could not be found in the provided token.");
            }
        } else {
            throw new RefreshTokenException("Provided refresh token is invalid.");
        }
    }

    private boolean refreshTokenExists(String oldRefreshToken) {
        Optional<String> familyId = getFamilyId(oldRefreshToken);
        if (familyId.isPresent()) {
            return refreshTokenRepository.findByRefreshTokenAndFamilyId(oldRefreshToken, familyId.get()) != null;
        } else {
            return false;
        }
    }

    private void invalidateTokenFamily(String oldRefreshToken) {
        Optional<String> familyId = getFamilyId(oldRefreshToken);
        familyId.ifPresent(refreshTokenRepository::deleteAllByFamilyId);
    }

    private boolean refreshTokenHasBeenUsed(String refreshToken) {
        Optional<String> familyId = getFamilyId(refreshToken);
        if (familyId.isPresent()) {
            RefreshToken refreshTokenEntry = refreshTokenRepository.findByRefreshTokenAndFamilyId(refreshToken, familyId.get());
            return refreshTokenEntry != null ? refreshTokenEntry.getUsed() : true;
        } else {
            return true;
        }
    }

    private void setRefreshTokenToUsed(String refreshToken, String familyId) {
        RefreshToken refreshTokenEntry = refreshTokenRepository.findByRefreshTokenAndFamilyId(refreshToken, familyId);
        refreshTokenRepository.deleteById(refreshTokenEntry.getId());
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .refreshToken(refreshToken)
                        .familyId(familyId)
                        .used(true)
                        .build()
        );
    }

    private void createNewEntry(String newRefreshToken, String familyId) {
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .refreshToken(newRefreshToken)
                        .familyId(familyId)
                        .build()
        );
    }

    @Override
    public void logOut(String refreshToken) {
        invalidateTokenFamily(refreshToken);
    }

    @Override
    public String createAccessToken(String email, Role role) {
        return jwtProvider.createAccessToken(email, role);
    }

    @Override
    public String createRefreshTokenForExistingFamily(String oldRefreshToken) {
        String newRefreshToken = jwtProvider.createRefreshTokenForExistingFamily(oldRefreshToken);
        Optional<String> familyId = jwtProvider.getFamilyId(newRefreshToken);
        setRefreshTokenToUsed(oldRefreshToken, familyId.get());
        createNewEntry(newRefreshToken, familyId.get());
        return newRefreshToken;
    }

    @Override
    public String createRefreshTokenForNewFamily(String email, Role role) {
        String newRefreshToken = jwtProvider.createRefreshTokenForNewFamily(email, role);
        Optional<String> familyId = jwtProvider.getFamilyId(newRefreshToken);
        createNewEntry(newRefreshToken, familyId.get());
        return newRefreshToken;
    }

    @Override
    public boolean validateToken(String token) {
        return jwtProvider.validateToken(token);
    }

    @Override
    public Optional<String> getEmail(String token) {
        return jwtProvider.getEmail(token);
    }

    @Override
    public Optional<Authentication> getAuthentication(String token) {
        return jwtProvider.getAuthentication(token);
    }

    @Override
    public String extractTokenFromHttpRequest(HttpServletRequest request) {
        return jwtProvider.extractTokenFromHttpRequest(request);
    }

    @Override
    public Optional<Role> getRole(String token) {
        return jwtProvider.getRole(token);
    }

    @Override
    public Optional<String> getFamilyId(String token) {
        return jwtProvider.getFamilyId(token);
    }

    @Override
    public Long getExpiration(String token) {
        return jwtProvider.getExpiration(token);
    }
}
