package com.preparedhypeboys.pnj.global.config;

import com.preparedhypeboys.pnj.global.error.JwtAuthenticationEntryPoint;
import com.preparedhypeboys.pnj.global.filter.JwtAuthenticationFilter;
import com.preparedhypeboys.pnj.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;

    private final JWTUtil jwtUtil;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .addFilter(corsFilter)
            .formLogin().disable()
            .httpBasic().disable()
            .formLogin().disable()
            .authorizeRequests()
            .antMatchers("/api/login").permitAll()
            .antMatchers("/api/login/token/refresh").permitAll()
            .antMatchers("/profile").permitAll()
            .antMatchers("/api/health").permitAll()
            .anyRequest().authenticated()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
            ;

        return http.build();
    }
}
