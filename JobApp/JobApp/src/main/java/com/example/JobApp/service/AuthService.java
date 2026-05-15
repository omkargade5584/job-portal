package com.example.JobApp.service;


import com.example.JobApp.dto.AuthResponse;
import com.example.JobApp.dto.LoginRequest;
import com.example.JobApp.dto.RegisterRequest;
import com.example.JobApp.model.Role;
import com.example.JobApp.model.User;
import com.example.JobApp.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;  // bcrypt
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // ─── REGISTER ─────────────────────────────────────────────────────────────

    public AuthResponse register(RegisterRequest request) {
        try {
            // 1. Check if email already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already registered");
            }

            // 2. Build user object — hash the password before saving
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword())); // bcrypt hash
            user.setRole(Role.valueOf(request.getRole().toUpperCase())); // "seeker" → SEEKER

            // 3. Save to database
            userRepository.save(user);

            // 4. Generate JWT and return it
            String token = jwtService.generateToken(user);
            return new AuthResponse(token, user.getRole().name(), user.getEmail(), user.getName());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    // ─── LOGIN ────────────────────────────────────────────────────────────────

    public AuthResponse login(LoginRequest request) {

        // 1. Spring Security checks email + password against DB automatically
        //    If wrong → throws BadCredentialsException → React gets 401
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. If we reach here, credentials are correct — load the user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Generate JWT token
        String token = jwtService.generateToken(user);

        // 4. Send token + user info back to React
        return new AuthResponse(token, user.getRole().name(), user.getEmail(), user.getName());
    }
}
