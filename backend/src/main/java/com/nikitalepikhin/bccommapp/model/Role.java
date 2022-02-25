package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public enum Role {
    STUDENT(Set.of(Authority.DUMMY_READ)),
    TEACHER(Set.of(Authority.DUMMY_READ, Authority.DUMMY_WRITE)),
    ADMIN(Set.of(Authority.DUMMY_READ, Authority.DUMMY_WRITE));

    private final Set<Authority> authorities;

    public Set<SimpleGrantedAuthority> getSimpleGrantedAuthoritySet() {
        return getAuthorities()
                .stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                .collect(Collectors.toSet());
    }
}
