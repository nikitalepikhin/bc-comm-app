package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticateUserDto {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
