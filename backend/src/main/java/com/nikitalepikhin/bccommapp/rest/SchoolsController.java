package com.nikitalepikhin.bccommapp.rest;

import com.nikitalepikhin.bccommapp.dto.school.GetMatchingSchoolsRequestDto;
import com.nikitalepikhin.bccommapp.dto.school.GetSchoolsDto;
import com.nikitalepikhin.bccommapp.dto.school.SchoolDto;
import com.nikitalepikhin.bccommapp.model.School;
import com.nikitalepikhin.bccommapp.service.SchoolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;

@Slf4j
@RestController
@RequestMapping(("/api/schools"))
@Tag(name = "Schools Controller")
public class SchoolsController {

    private final SchoolService schoolService;

    @Autowired
    public SchoolsController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @GetMapping("/")
    @Operation(summary = "Get all schools")
    @PreAuthorize("hasAuthority('SCHOOL_READ')")
    public ResponseEntity<GetSchoolsDto> getAllSchools() {
        Iterator<School> schoolIterator = schoolService.getAllSchools().iterator();
        GetSchoolsDto response = new GetSchoolsDto(new ArrayList<>());
        schoolIterator.forEachRemaining(school -> response.getSchools().add(new SchoolDto(
                school.getUuid(), school.getName(), school.getCountryAlpha3Code(), school.getAddressLine1(), school.getAddressLine2(),
                school.getPostalIndex(), school.getCity()
        )));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/")
    @Operation(summary = "Get all schools matching the substring")
    @PreAuthorize("hasAuthority('SCHOOL_READ')")
    public ResponseEntity<GetSchoolsDto> getAllMatchingSchools(@RequestBody GetMatchingSchoolsRequestDto request) {
        Iterator<School> schoolIterator = schoolService.getAllMatchingSchools(request.getSubstring()).iterator();
        GetSchoolsDto response = new GetSchoolsDto(new ArrayList<>());
        schoolIterator.forEachRemaining(school -> response.getSchools().add(new SchoolDto(
                school.getUuid(), school.getName(), school.getCountryAlpha3Code(), school.getAddressLine1(), school.getAddressLine2(),
                school.getPostalIndex(), school.getCity()
        )));
        return ResponseEntity.ok(response);
    }
}
