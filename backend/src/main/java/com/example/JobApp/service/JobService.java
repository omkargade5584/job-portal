package com.example.JobApp.service;

import com.example.JobApp.dto.JobRequest;
import com.example.JobApp.dto.JobResponse;
import com.example.JobApp.model.Job;
import com.example.JobApp.model.User;
import com.example.JobApp.repo.JobRepository;
import com.example.JobApp.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    // ─── GET ALL JOBS (public) ────────────────────────────────────────────────

    public List<JobResponse> getAllJobs(String keyword, String location, String jobType) {
        List<Job> jobs;

        if (keyword != null && !keyword.isEmpty()) {
            jobs = jobRepository.searchByKeyword(keyword);
        } else if (location != null && !location.isEmpty()) {
            jobs = jobRepository.findByLocationContainingIgnoreCaseAndActiveTrue(location);
        } else if (jobType != null && !jobType.isEmpty()) {
            jobs = jobRepository.findByJobTypeAndActiveTrue(jobType);
        } else {
            jobs = jobRepository.findByActiveTrue();
        }

        return jobs.stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ─── GET SINGLE JOB ───────────────────────────────────────────────────────

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return toResponse(job);
    }

    // ─── CREATE JOB (employer only) ───────────────────────────────────────────

    public JobResponse createJob(JobRequest request) {
        // Get the logged-in employer from the JWT (Spring Security stores it)
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User employer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setSkills(request.getSkills());
        job.setEmployer(employer);

        return toResponse(jobRepository.save(job));
    }

    // ─── UPDATE JOB ───────────────────────────────────────────────────────────

    public JobResponse updateJob(Long id, JobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Only the employer who posted it can edit
        String currentUserEmail = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        if (!job.getEmployer().getEmail().equals(currentUserEmail)) {
            throw new RuntimeException("You can only edit your own jobs");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setSkills(request.getSkills());

        return toResponse(jobRepository.save(job));
    }

    // ─── DELETE JOB (soft delete — just mark inactive) ───────────────────────

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        String currentUserEmail = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        // Admin can delete any job, employer can only delete their own
        boolean isAdmin = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities()
                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !job.getEmployer().getEmail().equals(currentUserEmail)) {
            throw new RuntimeException("Not authorized to delete this job");
        }

        job.setActive(false); // soft delete — data stays in DB
        jobRepository.save(job);
    }

    // ─── GET MY JOBS (employer sees only their postings) ─────────────────────

    public List<JobResponse> getMyJobs() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        User employer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return jobRepository.findByEmployerAndActiveTrue(employer)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ─── Helper: convert Job entity → JobResponse DTO ─────────────────────────

    private JobResponse toResponse(Job job) {
        JobResponse res = new JobResponse();
        res.setId(job.getId());
        res.setTitle(job.getTitle());
        res.setDescription(job.getDescription());
        res.setLocation(job.getLocation());
        res.setJobType(job.getJobType());
        res.setSalaryMin(job.getSalaryMin());
        res.setSalaryMax(job.getSalaryMax());
        res.setSkills(job.getSkills());
        res.setPostedAt(job.getPostedAt());
        res.setEmployerName(job.getEmployer().getName());
        res.setEmployerEmail(job.getEmployer().getEmail());
        return res;
    }
}