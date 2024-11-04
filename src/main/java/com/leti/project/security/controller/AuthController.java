package com.leti.project.security.controller;

import com.leti.project.dto.JwtResponse;
import com.leti.project.dto.LoginRequest;
import com.leti.project.dto.RegisterRequest;
import com.leti.project.security.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public JwtResponse signUp(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public JwtResponse signIn(@RequestBody LoginRequest request) {
        return authenticationService.login(request);
    }
}
