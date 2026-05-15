package com.example.JobApp.dto;

import lombok.Data;

@Data  // generates getters/setters automatically (Lombok)
public class LoginRequest {
    private String email;
    private String password;
}
