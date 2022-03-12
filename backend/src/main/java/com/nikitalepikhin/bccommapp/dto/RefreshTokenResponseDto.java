package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@ApiModel(value = RefreshTokenResponseDto.ENTITY_NAME)
public class RefreshTokenResponseDto {

    public static final String ENTITY_NAME = "RefreshTokenResponse";

    @ApiModelProperty(required = true, value = "access_token")
    @JsonProperty("access_token")
    private String accessToken;
}
