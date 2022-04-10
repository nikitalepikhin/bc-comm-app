package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@DynamicInsert
public class BaseEntityUser {

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private StatusLookup status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private RoleLookup role;

    @Column(name = "username", nullable = false, length = 32)
    private String username;

    @Column(name = "email", nullable = false, length = 128)
    private String email;

    @Column(name = "password", nullable = false, length = 1024)
    private String password;

    @Builder.Default
    @Column(name = "created", nullable = false)
    private Instant created = Instant.now();

    @Builder.Default
    @Column(name = "email_modified", nullable = false)
    private Instant emailModified = Instant.now();

    @Builder.Default
    @Column(name = "username_modified", nullable = false)
    private Instant usernameModified = Instant.now();

    @Builder.Default
    @Column(name = "password_modified", nullable = false)
    private Instant passwordModified = Instant.now();

    @Builder.Default
    @Column(name = "modified", nullable = false)
    private Instant modified = Instant.now();
}