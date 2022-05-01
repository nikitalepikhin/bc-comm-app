package com.nikitalepikhin.bccommapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

    private final JwtFilterConfigurer jwtFilterConfigurer;

    private final CookieFilterConfigurer cookieFilterConfigurer;

    private final UserDetailsService userDetailsService;

    @Value("${password.encoder.strength}")
    private Integer passwordEncoderStrength;

    @Autowired
    public SecurityConfigurer(
            JwtFilterConfigurer jwtFilterConfigurer,
            CookieFilterConfigurer cookieFilterConfigurer,
            @Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.jwtFilterConfigurer = jwtFilterConfigurer;
        this.cookieFilterConfigurer = cookieFilterConfigurer;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(c -> {
                    CorsConfigurationSource cs = request -> {
                        CorsConfiguration cc = new CorsConfiguration();
                        cc.setAllowedOrigins(List.of("https://commapp.com"));
                        cc.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
                        cc.setAllowCredentials(true);
                        cc.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Cookie"));
                        return cc;
                    };
                    c.configurationSource(cs);
                });
        httpSecurity
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .regexMatchers("/v3/api-docs.*").permitAll()
                .regexMatchers("/swagger-ui.*").permitAll()
                .regexMatchers("/api/auth/login").permitAll()
                .regexMatchers("/api/auth/refresh").permitAll()
                .regexMatchers("/api/auth/signup/.*").permitAll()
                .regexMatchers("/api/schools/").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(jwtFilterConfigurer)
                .and()
                .apply(cookieFilterConfigurer);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(passwordEncoderStrength);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
