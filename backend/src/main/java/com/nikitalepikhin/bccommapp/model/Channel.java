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
@Table(name = "channels")
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Column(name = "description", length = 512)
    private String description;

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
    @Column(name = "description_modified", nullable = false)
    private Instant descriptionModified = Instant.now();

    @ManyToMany(mappedBy = "administeredChannels")
    private Set<User> adminUsers = new LinkedHashSet<>();

}