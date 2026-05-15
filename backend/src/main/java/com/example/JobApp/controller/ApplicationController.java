package com.example.JobApp.controller;

import com.example.JobApp.dto.ApplicationRequest;
import com.example.JobApp.dto.ApplicationResponse;
import com.example.JobApp.dto.UpdateStatusRequest;
import com.example.JobApp.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // POST /api/applications
    // SEEKER only
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('SEEKER')") // In case it's ROLE_USER or ROLE_SEEKER
    public ResponseEntity<ApplicationResponse> apply(@RequestBody ApplicationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.applyToJob(request));
    }

    // GET /api/applications/my-applications
    // SEEKER only
    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('USER') or hasRole('SEEKER')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications() {
        return ResponseEntity.ok(applicationService.getMyApplications());
    }

    // GET /api/applications/employer
    // EMPLOYER only
    @GetMapping("/employer")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<ApplicationResponse>> getEmployerApplications() {
        return ResponseEntity.ok(applicationService.getApplicationsForEmployer());
    }

    // PUT /api/applications/5/status
    // EMPLOYER or ADMIN
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(applicationService.updateStatus(id, request));
    }
}
