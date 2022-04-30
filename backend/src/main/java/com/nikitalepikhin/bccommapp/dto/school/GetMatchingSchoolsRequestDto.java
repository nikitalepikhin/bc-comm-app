package com.nikitalepikhin.bccommapp.dto.school;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class GetMatchingSchoolsRequestDto {

    private String substring;
}
