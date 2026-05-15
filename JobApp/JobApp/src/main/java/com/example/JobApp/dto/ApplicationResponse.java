package com.example.JobApp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationResponse {
    private String id; // Use String for frontend compatibility if needed, or Long. "app_123" was in mock, but Long is fine. We will send Long.
    private Long jobId;
    private String jobTitle;
    private String company;
    private Long seekerId;
    private String seekerName;
    private String status;
    private String appliedAt;
}
