package com.projen.backend.service;

import org.springframework.stereotype.Service;

import com.projen.backend.dto.TaskRequestDto;
import com.projen.backend.dto.TaskResponseDto;
import com.projen.backend.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    public final TaskRepository taskRepository;




    public TaskResponseDto deleteTask(Long id) {

        return null;

    }
    public TaskResponseDto getTaskById(Long id) {

        return null ;
    }

    public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {

        return null;
    }
    public TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto) {

        return null;
    }

    
    
}
