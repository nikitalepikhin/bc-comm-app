package com.nikitalepikhin.bccommapp.config;

import com.nikitalepikhin.bccommapp.security.CookieFilter;
import com.nikitalepikhin.bccommapp.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.stereotype.Component;

@Component
public class CookieFilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final CookieFilter cookieFilter;

    @Autowired
    public CookieFilterConfigurer(CookieFilter cookieFilter) {
        this.cookieFilter = cookieFilter;
    }

    @Override
    public void configure(HttpSecurity httpSecurity) {
        httpSecurity.addFilterBefore(cookieFilter, JwtFilter.class);
    }
}
