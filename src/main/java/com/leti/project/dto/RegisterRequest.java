package com.leti.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
    private String username;

    private String password;

    private Set<String> roles;
}
