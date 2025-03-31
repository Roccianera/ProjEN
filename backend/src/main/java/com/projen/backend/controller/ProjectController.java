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

import com.projen.backend.dto.ProjectResponseDto;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/projects")
public class ProjectController {


    

    @GetMapping("/")
    public ResponseEntity<?> getAllProjects() {
        return ResponseEntity.ok("Welcome to Projen API");
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok("Welcome to Projen API");
    }

    @PostMapping("/")
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectResponseDto project) {
        return ResponseEntity.ok("Welcome to Projen API");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectResponseDto project) {
        return ResponseEntity.ok("Welcome to Projen API");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return ResponseEntity.ok("Welcome to Projen API");
    }


   
}
