package com.projen.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projen.backend.dto.ProjectRequestDto;
import com.projen.backend.dto.TaskCategoryRequestDto;
import com.projen.backend.dto.TaskRequestDto;
import com.projen.backend.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    
    // PROJECT ENDPOINTS
    @GetMapping("/")
    public ResponseEntity<?> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectRequestDto project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequestDto projectRequestDto) {
        return ResponseEntity.ok(projectService.updateProject(id, projectRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.deleteProject(id));
    }

    // TASK CATEGORY ENDPOINTS
    @PostMapping("/{projectId}/categories")
    public ResponseEntity<?> createTaskCategory(
            @PathVariable Long projectId, 
            @Valid @RequestBody TaskCategoryRequestDto taskCategoryRequestDto) {
        return ResponseEntity.ok(projectService.createTaskCategory(projectId, taskCategoryRequestDto));
    }

    @PutMapping("/{projectId}/categories/{categoryId}")
    public ResponseEntity<?> updateTaskCategory(
            @PathVariable Long projectId, 
            @PathVariable Long categoryId, 
            @Valid @RequestBody TaskCategoryRequestDto taskCategoryRequestDto) {
        return ResponseEntity.ok(projectService.updateTaskCategory(projectId, categoryId, taskCategoryRequestDto));
    }

    @DeleteMapping("/{projectId}/categories/{categoryId}")
    public ResponseEntity<?> deleteTaskCategory(
            @PathVariable Long projectId, 
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(projectService.deleteTaskCategory(projectId, categoryId));
    }

    // TASK ENDPOINTS
    @PostMapping("/{projectId}/categories/{categoryId}/tasks")
    public ResponseEntity<?> createTask(
            @PathVariable Long projectId, 
            @PathVariable Long categoryId, 
            @Valid @RequestBody TaskRequestDto taskRequestDto) {
        return ResponseEntity.ok(projectService.createTask(projectId, categoryId, taskRequestDto));
    }

    @PutMapping("/{projectId}/tasks/{taskId}/toggle-complete")
    public ResponseEntity<?> toggleTaskComplete(
            @PathVariable Long projectId, 
            @PathVariable Long taskId) {
        return ResponseEntity.ok(projectService.updateTaskComplete(projectId, taskId));
    }

    @DeleteMapping("/{projectId}/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(
            @PathVariable Long projectId, 
            @PathVariable Long taskId) {
        return ResponseEntity.ok(projectService.deleteTask(projectId, taskId));
    }
}
