package com.leti.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String jwt;
    private Long id;
    private String username;
    private Set<String> roles;
}
