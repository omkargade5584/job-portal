package com.example.JobApp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String jobType;
    private Double salaryMin;
    private Double salaryMax;
    private String skills;
    private String employerName;    // shown on job card in React
    private String employerEmail;
    private LocalDateTime postedAt;
}
