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
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @Column(name = "body", nullable = false, length = 10000)
    private String body;

    @Builder.Default
    @Column(name = "created", nullable = false)
    private Instant created = Instant.now();

    @Builder.Default
    @Column(name = "modified", nullable = false)
    private Instant modified = Instant.now();

    @Column(name = "upvote_count", nullable = false)
    private Integer upvoteCount;

    @Column(name = "downvote_count", nullable = false)
    private Integer downvoteCount;

    @ManyToMany
    @JoinTable(name = "comment_user_upvote",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> upvotedByUsers = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "comment_user_downvote",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> downvotedByUsers = new LinkedHashSet<>();

}