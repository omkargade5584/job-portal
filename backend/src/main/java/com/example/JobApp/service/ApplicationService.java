package com.example.JobApp.service;

import com.example.JobApp.dto.ApplicationRequest;
import com.example.JobApp.dto.ApplicationResponse;
import com.example.JobApp.dto.UpdateStatusRequest;
import com.example.JobApp.model.Application;
import com.example.JobApp.model.ApplicationStatus;
import com.example.JobApp.model.Job;
import com.example.JobApp.model.User;
import com.example.JobApp.repo.ApplicationRepository;
import com.example.JobApp.repo.JobRepository;
import com.example.JobApp.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ApplicationResponse applyToJob(ApplicationRequest request) {
        User seeker = getCurrentUser();
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsByJobIdAndSeekerId(job.getId(), seeker.getId())) {
            throw new RuntimeException("Already applied to this job");
        }

        Application app = new Application();
        app.setJob(job);
        app.setSeeker(seeker);
        app.setResumeUrl(request.getResumeUrl());
        app.setCoverLetter(request.getCoverLetter());
        app.setStatus(ApplicationStatus.APPLIED);

        applicationRepository.save(app);
        return mapToResponse(app);
    }

    public List<ApplicationResponse> getMyApplications() {
        User seeker = getCurrentUser();
        return applicationRepository.findBySeekerId(seeker.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<ApplicationResponse> getApplicationsForEmployer() {
        User employer = getCurrentUser();
        return applicationRepository.findByJobEmployerId(employer.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public ApplicationResponse updateStatus(Long id, UpdateStatusRequest request) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        // Employer check: ensure this job belongs to the current employer
        User currentUser = getCurrentUser();
        if (!app.getJob().getEmployer().getId().equals(currentUser.getId()) && !currentUser.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Not authorized to update this application");
        }

        app.setStatus(ApplicationStatus.valueOf(request.getStatus().toUpperCase()));
        applicationRepository.save(app);
        return mapToResponse(app);
    }

    private ApplicationResponse mapToResponse(Application app) {
        ApplicationResponse dto = new ApplicationResponse();
        dto.setId(app.getId().toString());
        dto.setJobId(app.getJob().getId());
        dto.setJobTitle(app.getJob().getTitle());
        dto.setCompany(app.getJob().getEmployer().getName());
        dto.setSeekerId(app.getSeeker().getId());
        dto.setSeekerName(app.getSeeker().getName());
        dto.setStatus(app.getStatus().name());
        dto.setAppliedAt(app.getAppliedAt().format(DateTimeFormatter.ISO_DATE_TIME));
        return dto;
    }
}
