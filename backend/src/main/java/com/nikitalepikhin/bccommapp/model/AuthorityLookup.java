package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "authority_lookup")
public class AuthorityLookup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority_value", nullable = false, length = 16)
    private AuthorityValueType authorityValue;

}