package com.leti.project.security.service;

import com.leti.project.dto.request.LoginRequest;
import com.leti.project.dto.request.RegisterRequest;
import com.leti.project.dto.response.JwtResponse;
import com.leti.project.security.entity.Role;
import com.leti.project.security.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public JwtResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .build();

        User createdUser = userService.create(user);

        var jwt = jwtService.generateToken(user);
        return new JwtResponse(jwt,
                createdUser.getId(),
                createdUser.getUsername(),
                createdUser.getRole().name());
    }

    public JwtResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService
                .getByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user);
        return new JwtResponse(jwt,
                user.getId(),
                user.getUsername(),
                user.getRole().name());
    }
}
