package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nikitalepikhin.bccommapp.model.Role;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = RegisterUserRequestDto.ENTITY_NAME)
public class RegisterUserRequestDto {

    public static final String ENTITY_NAME = "RegisterUserRequest";

    @ApiModelProperty(required = true, value = "email")
    @JsonProperty("email")
    private String email;

    @ApiModelProperty(required = true, value = "password")
    @JsonProperty("password")
    private String password;

    @ApiModelProperty(required = true, value = "role")
    @JsonProperty("role")
    private Role role;

}
