package com.example.JobApp.dto;

import lombok.Data;

@Data
public class JobRequest {
    private String title;
    private String description;
    private String location;
    private String jobType;
    private Double salaryMin;
    private Double salaryMax;
    private String skills;
}
