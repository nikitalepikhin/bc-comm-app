package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "role_lookup")
public class RoleLookup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_value", nullable = false, length = 16)
    private RoleValueType roleValue;

    @ManyToMany
    @JoinTable(name = "role_authority",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id"))
    private Set<AuthorityLookup> assignedAuthorities = new LinkedHashSet<>();

    public Set<SimpleGrantedAuthority> getSimpleGrantedAuthoritySet() {
        return assignedAuthorities
                .stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityValue().getAuthority()))
                .collect(Collectors.toSet());
    }
}