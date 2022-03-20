package com.nikitalepikhin.bccommapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class LogInUserRequestDto {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
