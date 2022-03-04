package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.dto.RefreshTokenResponseDto;
import com.nikitalepikhin.bccommapp.exception.RefreshTokenException;
import com.nikitalepikhin.bccommapp.model.Role;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface JwtService {

    RefreshTokenResponseDto refreshAccessToken(String refreshToken) throws RefreshTokenException;

    void logOut(String refreshToken);

    String createAccessToken(String email, Role role);

    String createRefreshTokenForExistingFamily(String oldRefreshToken);

    String createRefreshTokenForNewFamily(String email, Role role);

    boolean validateToken(String token);

    Optional<String> getEmail(String token);

    Optional<Authentication> getAuthentication(String token);

    String extractTokenFromHttpRequest(HttpServletRequest request);

    Optional<Role> getRole(String token);

    Optional<String> getFamilyId(String token);
}
