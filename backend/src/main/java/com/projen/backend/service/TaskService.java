package com.projen.backend.service;

import org.springframework.stereotype.Service;

import com.projen.backend.dto.MapperDto;
import com.projen.backend.dto.TaskRequestDto;
import com.projen.backend.dto.TaskResponseDto;
import com.projen.backend.exception.ResourceNotFound;
import com.projen.backend.repository.TaskCategoryRepository;
import com.projen.backend.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    public final TaskRepository taskRepository;
    public final MapperDto mapperDto;

    public final TaskCategoryRepository taskCategoryRepository;

    public TaskResponseDto deleteTask(Long id) {

        var task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Task not found"));

        taskRepository.delete(task);

        return mapperDto.mapToTaskResponseDto(task);

    }

    public TaskResponseDto getTaskById(Long id) {

        var task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Task not found"));

        return mapperDto.mapToTaskResponseDto(task);

    }

    public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {

        var task = mapperDto.mapToTask(taskRequestDto);

        var taskCategory = taskCategoryRepository.findById(taskRequestDto.taskCategoryId())
                .orElseThrow(() -> new ResourceNotFound("Task category not found"));

        task.setTaskCategory(taskCategory);

        taskRepository.save(task);

        return mapperDto.mapToTaskResponseDto(task);

    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto) {

        var task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Task not found"));

        task.setName(taskRequestDto.name());
        task.setDescription(taskRequestDto.description());
        task.setIsCompleted(taskRequestDto.isCompleted());

        taskRepository.save(task);

        return mapperDto.mapToTaskResponseDto(task);
    }

}
