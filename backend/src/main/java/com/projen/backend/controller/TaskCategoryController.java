package com.projen.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.projen.backend.dto.TaskCategoryRequestDto;
import com.projen.backend.service.TaskCategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/task-categories")
@RequiredArgsConstructor
public class TaskCategoryController {

    private final TaskCategoryService taskCategoryService;

    @GetMapping("/{id}")
    @PreAuthorize("@securityService.hasAccessForTaskCategory(authentication, #id)")
    public ResponseEntity<?> getTaskCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(taskCategoryService.getTaskCategoryById(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createTaskCategory(@Valid @RequestBody TaskCategoryRequestDto taskCategoryRequestDto) {
        return ResponseEntity.ok(taskCategoryService.createTaskCategory(taskCategoryRequestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@securityService.hasAccessForTaskCategory(authentication, #id)")
    public ResponseEntity<?> updateTaskCategory(
            @PathVariable Long id,
            @Valid @RequestBody TaskCategoryRequestDto taskCategoryRequestDto) {
        return ResponseEntity.ok(taskCategoryService.updateTaskCategory(id, taskCategoryRequestDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@securityService.hasAccessForTaskCategory(authentication, #id)")
    public ResponseEntity<?> deleteTaskCategory(@PathVariable Long id) {
        return ResponseEntity.ok(taskCategoryService.deleteTaskCategory(id));
    }
}