package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class BaseEntityTeacher {

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Column(name = "bio", length = 1024)
    private String bio;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "name_modified", nullable = false)
    private Instant nameModified = Instant.now();

    @Column(name = "bio_modified", nullable = false)
    private Instant bioModified = Instant.now();

    @Column(name = "school_modified", nullable = false)
    private Instant schoolModified = Instant.now();

    @Column(name = "department_modified", nullable = false)
    private Instant departmentModified = Instant.now();

}
