package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserLikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Embedded
    private BaseEntityUser baseEntityUser;

    @ManyToMany
    @JoinTable(name = "channel_admin_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "channel_id"))
    private Set<Channel> administeredChannels = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "upvotedByUsers")
    private Set<Post> upvotedPosts = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "downvotedByUsers")
    private Set<Post> downvotedPosts = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "downvotedByUsers")
    private Set<Comment> downvotedComments = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "upvotedByUsers")
    private Set<Comment> upvotedComments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "author")
    private Set<Comment> createdComments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "author")
    private Set<Post> createdPosts = new LinkedHashSet<>();

}