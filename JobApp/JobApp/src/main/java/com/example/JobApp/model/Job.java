package com.example.JobApp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String jobType;         // FULL_TIME, PART_TIME, REMOTE, CONTRACT
    private Double salaryMin;
    private Double salaryMax;
    private String skills;          // comma-separated: "Java,Spring,React"
    private boolean active = true;
    private LocalDateTime postedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;          // who posted this job
}
