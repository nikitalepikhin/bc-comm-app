package com.nikitalepikhin.bccommapp.model_OLD;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Table(name = "users")
public class User_OLD {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "username", nullable = false, length = 64)
    private String username;

    @Column(name = "password", nullable = false, length = 256)
    private String password;

    @Column(name = "email", nullable = false, length = 128)
    private String email;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "role", nullable = false, length = 16)
    private Role_OLD roleOLD;

    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", length = 16)
    private Status_OLD statusOLD = Status_OLD.ACTIVE;

    @Builder.Default
    @Column(name = "created", nullable = false)
    private Instant created = Instant.now();

    @Builder.Default
    @Column(name = "modified", nullable = false)
    private Instant modified = Instant.now();
}