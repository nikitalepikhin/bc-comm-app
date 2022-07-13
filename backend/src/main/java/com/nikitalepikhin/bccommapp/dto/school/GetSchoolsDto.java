package com.nikitalepikhin.bccommapp.dto.school;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class GetSchoolsDto {

    @JsonProperty("schools")
    private List<SchoolDto> schools;
}
