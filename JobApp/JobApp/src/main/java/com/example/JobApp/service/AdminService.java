package com.example.JobApp.service;

import com.example.JobApp.dto.AdminStatsResponse;
import com.example.JobApp.model.ApplicationStatus;
import com.example.JobApp.model.Role;
import com.example.JobApp.repo.ApplicationRepository;
import com.example.JobApp.repo.JobRepository;
import com.example.JobApp.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public AdminStatsResponse getStats() {
        AdminStatsResponse response = new AdminStatsResponse();
        
        response.setTotalJobs(jobRepository.count());
        response.setTotalApplications(applicationRepository.count());
        response.setTotalUsers(userRepository.countByRole(Role.USER));
        response.setTotalEmployers(userRepository.countByRole(Role.EMPLOYER));
        
        List<AdminStatsResponse.NameValue> appStatus = new ArrayList<>();
        appStatus.add(new AdminStatsResponse.NameValue("Applied", applicationRepository.countByStatus(ApplicationStatus.APPLIED)));
        appStatus.add(new AdminStatsResponse.NameValue("Reviewing", applicationRepository.countByStatus(ApplicationStatus.REVIEWING)));
        appStatus.add(new AdminStatsResponse.NameValue("Accepted", applicationRepository.countByStatus(ApplicationStatus.ACCEPTED)));
        appStatus.add(new AdminStatsResponse.NameValue("Rejected", applicationRepository.countByStatus(ApplicationStatus.REJECTED)));
        response.setApplicationsByStatus(appStatus);

        // Dummy stats for salary insights to keep it simple, since we don't have aggregate SQL yet
        List<AdminStatsResponse.RoleAvg> salaryInsights = new ArrayList<>();
        salaryInsights.add(new AdminStatsResponse.RoleAvg("Junior Dev", 87500));
        salaryInsights.add(new AdminStatsResponse.RoleAvg("Mid Dev", 110000));
        salaryInsights.add(new AdminStatsResponse.RoleAvg("Senior Dev", 135000));
        response.setSalaryInsights(salaryInsights);

        List<AdminStatsResponse.MonthJobs> monthJobs = new ArrayList<>();
        monthJobs.add(new AdminStatsResponse.MonthJobs("Jan", 4));
        monthJobs.add(new AdminStatsResponse.MonthJobs("Feb", 7));
        monthJobs.add(new AdminStatsResponse.MonthJobs("Mar", 5));
        monthJobs.add(new AdminStatsResponse.MonthJobs("Apr", jobRepository.count()));
        response.setJobsByMonth(monthJobs);

        return response;
    }
}
