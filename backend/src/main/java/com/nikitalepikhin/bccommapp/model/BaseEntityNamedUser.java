package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class BaseEntityNamedUser {

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Column(name = "bio", length = 1024)
    private String bio;

    @Column(name = "name_modified", nullable = false)
    private Instant nameModified = Instant.now();

    @Column(name = "bio_modified", nullable = false)
    private Instant bioModified = Instant.now();

}
