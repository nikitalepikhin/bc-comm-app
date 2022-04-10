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
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @Column(name = "refresh_token", length = 1024, nullable = false)
    private String refreshToken;

    @Column(name = "family_uuid", nullable = false)
    private UUID familyUuid;

    @Builder.Default
    @Column(name = "used", nullable = false)
    private Boolean used = false;

}