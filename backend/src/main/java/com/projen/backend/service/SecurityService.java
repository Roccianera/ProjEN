package com.projen.backend.service;

import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Component;

import com.projen.backend.repository.ProjectRepository;
import com.projen.backend.repository.TaskCategoryRepository;
import com.projen.backend.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Component("securityService")
@RequiredArgsConstructor
public class SecurityService {

    private final TaskRepository taskRepository;
    private final TaskCategoryRepository taskCategoriesRepository;
    private final ProjectRepository projectRepository;

    public boolean hasAccessForTask(Authentication authentication, Long taskId) {
        String username = authentication.getName();
        return taskRepository.existsByIdAndTaskCategory_Project_User_Username(taskId, username);
    }

    public boolean hasAccessForTaskCategory(Authentication authentication, Long taskCategoryId) {
        String username = authentication.getName();
        return taskCategoriesRepository.existsByIdAndProject_User_Username(taskCategoryId, username);
    }

    public boolean hasAccessForProject(Authentication authentication, Long projectId) {
        String username = authentication.getName();
        return projectRepository.existsByIdAndUser_Username(projectId, username);
    }
}
