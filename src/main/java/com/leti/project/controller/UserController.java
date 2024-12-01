package com.leti.project.controller;

import com.leti.project.security.entity.User;
import com.leti.project.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/notRegistered")
    public ResponseEntity<List<User>> getAllNotRegisteredUsers() {
        return ResponseEntity.ok(userService.getAllNotRegisteredUsers());
    }
}
