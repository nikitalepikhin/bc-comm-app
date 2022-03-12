package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = LogInUserRequestDto.ENTITY_NAME)
public class LogInUserRequestDto {

    public static final String ENTITY_NAME = "LogInUserRequest";

    @ApiModelProperty(required = true, value = "email")
    @JsonProperty("email")
    private String email;

    @ApiModelProperty(required = true, value = "password")
    @JsonProperty("password")
    private String password;
}
