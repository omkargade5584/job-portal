package com.example.JobApp.repo;

import com.example.JobApp.model.Application;
import com.example.JobApp.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findBySeekerId(Long seekerId);
    List<Application> findByJobEmployerId(Long employerId);
    boolean existsByJobIdAndSeekerId(Long jobId, Long seekerId);
    long countByStatus(ApplicationStatus status);
}
