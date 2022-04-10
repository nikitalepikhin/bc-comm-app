package com.nikitalepikhin.bccommapp.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema
public class RefreshTokenResponseDto {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("email")
    private String email;

    @JsonProperty("username")
    private String username;
}