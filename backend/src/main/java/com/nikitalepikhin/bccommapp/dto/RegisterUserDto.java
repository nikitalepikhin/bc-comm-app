package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nikitalepikhin.bccommapp.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterUserDto {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("role")
    private Role role;

}
