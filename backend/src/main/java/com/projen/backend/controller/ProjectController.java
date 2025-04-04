package com.projen.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/")
    public ResponseEntity<?> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PreAuthorize("@securityService.hasAccessForProject(authentication, #id)")
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectRequestDto project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @PreAuthorize("@securityService.hasAccessForProject(authentication, #id)")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id,
            @Valid @RequestBody ProjectRequestDto projectRequestDto) {
        return ResponseEntity.ok(projectService.updateProject(id, projectRequestDto));
    }

    @PreAuthorize("@securityService.hasAccessForProject(authentication, #id)")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.deleteProject(id));
    }

}
