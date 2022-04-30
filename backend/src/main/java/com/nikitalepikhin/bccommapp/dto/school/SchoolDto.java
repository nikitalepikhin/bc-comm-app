package com.nikitalepikhin.bccommapp.dto.school;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class SchoolDto {

    @JsonProperty("uuid")
    private UUID uuid;

    @JsonProperty("name")
    private String name;

    @JsonProperty("country_code")
    private String countryCode;

    @JsonProperty("address_line_1")
    private String addressLineOne;

    @JsonProperty("address_line_2")
    private String addressLineTwo;

    @JsonProperty("post_index")
    private String postIndex;

    @JsonProperty("city")
    private String city;
}
