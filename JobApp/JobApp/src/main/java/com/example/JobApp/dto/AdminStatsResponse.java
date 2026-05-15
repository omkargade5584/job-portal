package com.example.JobApp.dto;

import lombok.Data;
import java.util.List;

@Data
public class AdminStatsResponse {
    private long totalJobs;
    private long totalApplications;
    private long totalUsers;
    private long totalEmployers;
    private List<NameValue> applicationsByStatus;
    private List<RoleAvg> salaryInsights;
    private List<MonthJobs> jobsByMonth;

    @Data
    public static class NameValue {
        private String name;
        private long value;
        public NameValue(String name, long value) { this.name = name; this.value = value; }
    }

    @Data
    public static class RoleAvg {
        private String role;
        private double avg;
        public RoleAvg(String role, double avg) { this.role = role; this.avg = avg; }
    }

    @Data
    public static class MonthJobs {
        private String month;
        private long jobs;
        public MonthJobs(String month, long jobs) { this.month = month; this.jobs = jobs; }
    }
}
