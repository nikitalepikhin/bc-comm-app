package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @Column(name = "country_alpha_3_code", nullable = false, length = 3)
    private String countryAlpha3Code;

    @Column(name = "city", nullable = false, length = 128)
    private String city;

    @Column(name = "address_line_1", length = 256)
    private String addressLine1;

    @Column(name = "address_line_2", length = 256)
    private String addressLine2;

    @Column(name = "postal_index", nullable = false, length = 16)
    private String postalIndex;

    @Builder.Default
    @Column(name = "created", nullable = false)
    private Instant created = Instant.now();

    @Builder.Default
    @Column(name = "modified", nullable = false)
    private Instant modified = Instant.now();

    @Builder.Default
    @Column(name = "name_modified", nullable = false)
    private Instant nameModified = Instant.now();

    @Builder.Default
    @Column(name = "address_modified", nullable = false)
    private Instant addressModified = Instant.now();

    @OneToMany(mappedBy = "baseEntityEmployee.department")
    private Set<Teacher> employedTeachers = new LinkedHashSet<>();

}