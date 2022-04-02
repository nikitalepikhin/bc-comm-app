package com.nikitalepikhin.bccommapp.security;

import com.nikitalepikhin.bccommapp.model_OLD.Status_OLD;
import com.nikitalepikhin.bccommapp.model_OLD.User_OLD;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
public class UserDetailsImpl implements UserDetails {

    private final String email;
    private final String password;
    private final boolean isActive;
    private final List<SimpleGrantedAuthority> grantedAuthorityList;

    public UserDetailsImpl(String email, String password, boolean isActive, List<SimpleGrantedAuthority> grantedAuthorityList) {
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.grantedAuthorityList = grantedAuthorityList;
    }

    public static UserDetails getUserDetailsFromUserEntity(User_OLD userOLD) {
        return new org.springframework.security.core.userdetails.User(
                userOLD.getEmail(),
                userOLD.getPassword(),
                userOLD.getStatusOLD().equals(Status_OLD.ACTIVE),
                userOLD.getStatusOLD().equals(Status_OLD.ACTIVE),
                userOLD.getStatusOLD().equals(Status_OLD.ACTIVE),
                userOLD.getStatusOLD().equals(Status_OLD.ACTIVE),
                userOLD.getRoleOLD().getSimpleGrantedAuthoritySet()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorityList;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isActive;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
