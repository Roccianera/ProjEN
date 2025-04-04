package com.projen.backend.service;

import org.springframework.stereotype.Service;

import com.projen.backend.dto.MapperDto;
import com.projen.backend.dto.TaskCategoryRequestDto;
import com.projen.backend.dto.TaskCategoryResponseDto;
import com.projen.backend.exception.ResourceNotFound;
import com.projen.backend.repository.ProjectRepository;
import com.projen.backend.repository.TaskCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskCategoryService {

    private final TaskCategoryRepository taskCategoryRepository;
    private final MapperDto mapperDto;
    private final ProjectRepository projectRepository;

    public TaskCategoryResponseDto createTaskCategory(TaskCategoryRequestDto taskCategoryRequestDto) {
        var taskCategory = mapperDto.mapToTaskCategory(taskCategoryRequestDto);

        var project = projectRepository.findById(taskCategoryRequestDto.projectId())
                .orElseThrow(() -> new ResourceNotFound("Project not found"));

        taskCategory.setProject(project);

        taskCategoryRepository.save(taskCategory);

        return mapperDto.mapToTaskCategoryResponseDto(taskCategory);
    }

    public TaskCategoryResponseDto getTaskCategoryById(Long id) {
        var taskCategory = taskCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Task category not found"));
        return mapperDto.mapToTaskCategoryResponseDto(taskCategory);
    }

    public TaskCategoryResponseDto updateTaskCategory(Long id, TaskCategoryRequestDto taskCategoryRequestDto) {
        var taskCategory = taskCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Task category not found"));

        taskCategory.setName(taskCategoryRequestDto.name());

        taskCategoryRepository.save(taskCategory);

        return mapperDto.mapToTaskCategoryResponseDto(taskCategory);
    }

    public TaskCategoryResponseDto deleteTaskCategory(Long id) {
        var taskCategory = taskCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Task category not found"));

        taskCategoryRepository.delete(taskCategory);

        return mapperDto.mapToTaskCategoryResponseDto(taskCategory);
    }
}
