package com.example.JobApp.repo;


import com.example.JobApp.model.Job;
import com.example.JobApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    // Find all active jobs
    List<Job> findByActiveTrue();

    // Find jobs posted by a specific employer
    List<Job> findByEmployerAndActiveTrue(User employer);

    // Search by keyword in title or description
    @Query("SELECT j FROM Job j WHERE j.active = true AND " +
            "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Job> searchByKeyword(@Param("keyword") String keyword);

    // Filter by location
    List<Job> findByLocationContainingIgnoreCaseAndActiveTrue(String location);

    // Filter by job type
    List<Job> findByJobTypeAndActiveTrue(String jobType);
}