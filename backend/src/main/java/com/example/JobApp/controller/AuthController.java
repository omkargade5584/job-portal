package com.example.JobApp.controller;


import com.example.JobApp.dto.AuthResponse;
import com.example.JobApp.dto.LoginRequest;
import com.example.JobApp.dto.RegisterRequest;
import com.example.JobApp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")        // base path
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // React calls: POST http://localhost:8080/api/auth/login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
        // Sends back: { "token": "eyJ...", "role": "EMPLOYER", "email": "test@test.com" }
    }

    // React calls: POST http://localhost:8080/api/auth/register
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        System.out.println("HIT REGISTER ENDPOINT with: " + request);
        return ResponseEntity.ok(authService.register(request));
    }
}
