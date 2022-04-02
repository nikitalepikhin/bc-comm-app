package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nikitalepikhin.bccommapp.model_OLD.Role_OLD;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class RegisterUserRequestDto {

    public static final String ENTITY_NAME = "RegisterUserRequest";

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("role")
    private Role_OLD roleOLD;

}
