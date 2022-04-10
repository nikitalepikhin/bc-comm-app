package com.nikitalepikhin.bccommapp.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * Registration user data for a simple user - admin or student
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class RegisterSimpleUserRequestDto {

    @NotNull
    @JsonProperty("email")
    private String email;

    @NotNull
    @JsonProperty("password")
    private String password;

}
