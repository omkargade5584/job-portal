package com.example.JobApp.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Long jobId;
    private String resumeUrl;
    private String coverLetter;
}
