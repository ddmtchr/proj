package com.leti.project.security.controller;

import com.leti.project.dto.request.LoginRequest;
import com.leti.project.dto.request.RegisterRequest;
import com.leti.project.dto.response.JwtResponse;
import com.leti.project.security.service.AuthenticationService;
import jakarta.validation.Valid;
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
    public JwtResponse register(@RequestBody @Valid RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public JwtResponse register(@RequestBody @Valid LoginRequest request) {
        return authenticationService.login(request);
    }
}
