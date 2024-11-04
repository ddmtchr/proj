package com.leti.project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String jwt;
    private Long id;
    private String username;
    private String role;
}
