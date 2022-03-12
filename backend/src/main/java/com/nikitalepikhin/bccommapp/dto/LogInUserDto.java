package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LogInUserDto {

    @ApiModelProperty(required = true, value = "email")
    @JsonProperty("email")
    private String email;

    @ApiModelProperty(required = true, value = "username")
    @JsonProperty("username")
    private String username;

    @ApiModelProperty(required = true, value = "access token")
    @JsonProperty("access_token")
    private String accessToken;

    @ApiModelProperty(required = true, value = "refresh token")
    @JsonProperty("refresh_token")
    private String refreshToken;

    public LogInUserResponseDto getLogInUserResponseDto() {
        return new LogInUserResponseDto(email, username, accessToken);
    }
}
