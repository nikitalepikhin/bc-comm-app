package com.nikitalepikhin.bccommapp.model_OLD;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public enum Role_OLD {
    STUDENT(Set.of(Authority_OLD.DUMMY_READ)),
    TEACHER(Set.of(Authority_OLD.DUMMY_READ, Authority_OLD.DUMMY_WRITE)),
    ADMIN(Set.of(Authority_OLD.DUMMY_READ, Authority_OLD.DUMMY_WRITE));

    private final Set<Authority_OLD> authorities;

    public Set<SimpleGrantedAuthority> getSimpleGrantedAuthoritySet() {
        return getAuthorities()
                .stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                .collect(Collectors.toSet());
    }
}