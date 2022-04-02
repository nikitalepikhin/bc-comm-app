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
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "channel_id", nullable = false)
    private Channel channel;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(name = "title", nullable = false, length = 300)
    private String title;

    @Column(name = "body", length = 40000)
    private String body;

    @Column(name = "created", nullable = false)
    private Instant created = Instant.now();

    @Column(name = "modified", nullable = false)
    private Instant modified = Instant.now();

    @Column(name = "upvote_count", nullable = false)
    private Integer upvoteCount;

    @Column(name = "downvote_count", nullable = false)
    private Integer downvoteCount;

    @ManyToMany
    @JoinTable(name = "post_user_upvote",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> upvotedByUsers = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "post_user_downvote",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> downvotedByUsers = new LinkedHashSet<>();

}