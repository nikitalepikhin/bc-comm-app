package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RefreshTokenDto;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.model_OLD.Role_OLD;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface JwtService {

    RefreshTokenDto refreshAccessToken(String refreshToken) throws RefreshTokenException;

    void logOut(String refreshToken);

    String createAccessToken(String email, Role_OLD roleOLD);

    String createRefreshTokenForExistingFamily(String oldRefreshToken);

    String createRefreshTokenForNewFamily(String email, Role_OLD roleOLD);

    boolean validateToken(String token);

    Optional<String> getEmail(String token);

    Optional<String> getUsername(String token);

    Optional<Authentication> getAuthentication(String token);

    String extractTokenFromHttpRequestHeader(HttpServletRequest request);

    Optional<Role_OLD> getRole(String token);

    Optional<String> getFamilyId(String token);

    Long getExpiration(String token);
}
