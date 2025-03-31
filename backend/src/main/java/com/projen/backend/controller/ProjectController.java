package com.projen.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projen.backend.dto.ProjectRequestDto;
import com.projen.backend.dto.ProjectResponseDto;
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
    
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        return  ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectRequestDto project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectResponseDto project) {
        return ResponseEntity.ok("Welcome to Projen API update ");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.deleteProject(id));
    }


    



    


   
}
