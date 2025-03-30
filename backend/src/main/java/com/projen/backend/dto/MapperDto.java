package com.projen.backend.dto;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.projen.backend.model.Project;
import com.projen.backend.model.Task;
import com.projen.backend.model.TaskCategory;
import com.projen.backend.model.TaskProfile;

@Service
public class MapperDto {
    

    public ProjectResponseDto mapToResponseDto(Project project) {
        return new ProjectResponseDto(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStartDate(),
                project.getEndDate(),
                project.getIsCompleted(),
                null // Assuming you will handle task categories separately
        );
    }
    public Project mapToProject(ProjectRequestDto projectRequestDto) {
    
        return Project.builder()
                .name(projectRequestDto.name())
                .description(projectRequestDto.description())
                .endDate(projectRequestDto.endDate())
                .build();

    }

    public  TaskCategoryRequestDto mapToTaskCategoryRequestDto(TaskCategory taskCategory) {
        return new TaskCategoryRequestDto(
                taskCategory.getId(),
                taskCategory.getName(),
                null // Assuming you will handle tasks separately
        );
    }
    public TaskCategory mapToTaskCategory(TaskCategoryRequestDto taskCategoryRequestDto) {
        return TaskCategory.builder()
                .name(taskCategoryRequestDto.name())
                .build();
    }

    public Task mapToTask(TaskRequestDto taskRequestDto) {

        var taskProfile= TaskProfile.builder().
                isCompleted(false)
                .name(taskRequestDto.name())
                .description(taskRequestDto.description())
                .startDate(LocalDate.now())
                .endDate(taskRequestDto.endDate())
                .build();

        return Task.builder()
                .name(taskRequestDto.name())
                .taskProfile(taskProfile)
                
                .build();
    }

   



    
}
