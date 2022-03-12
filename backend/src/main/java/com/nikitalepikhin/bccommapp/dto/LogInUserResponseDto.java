package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@ApiModel(value = LogInUserResponseDto.ENTITY_NAME)
public class LogInUserResponseDto {

    public static final String ENTITY_NAME = "LogInUserResponse";

    @ApiModelProperty(required = true, value = "email")
    @JsonProperty("email")
    private String email;

    @ApiModelProperty(required = true, value = "username")
    @JsonProperty("username")
    private String username;

    @ApiModelProperty(required = true, value = "access token")
    @JsonProperty("access_token")
    private String accessToken;
}
