package com.projen.backend.dto;

import java.time.LocalDate;
import java.util.stream.Collectors;

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
                project.getTaskCategories().stream().map((taskCategory) -> mapToTaskCategoryResponseDto(taskCategory)
                ).collect(Collectors.toList())
        );
    }
    public Project mapToProject(ProjectRequestDto projectRequestDto) {
    
        return Project.builder()
                .name(projectRequestDto.name())
                .description(projectRequestDto.description())
                .endDate(projectRequestDto.endDate())
                .startDate(LocalDate.now())
                .isCompleted(false)
                .TaskCategories(
                projectRequestDto.taskCategories().stream().map(taskCategoryRequestDto -> mapToTaskCategory(taskCategoryRequestDto)
                ).collect(Collectors.toList())

                )
                .build();

    }

    public  TaskCategoryResponseDto mapToTaskCategoryResponseDto(TaskCategory taskCategory) {
        return new TaskCategoryResponseDto(taskCategory.getId(), taskCategory.getName(),
         taskCategory.getTasks().stream().map(task->mapToTaskResponseDto(task)).collect(Collectors.toList()));
    }
    public TaskCategory mapToTaskCategory(TaskCategoryRequestDto taskCategoryRequestDto) {
        return TaskCategory.builder()
                .name(taskCategoryRequestDto.name())
                .tasks(taskCategoryRequestDto.tasks().stream().map(taskRequestDto->mapToTask(taskRequestDto)).collect(Collectors.toList()))
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

    public TaskResponseDto mapToTaskResponseDto(Task task) {
        return new TaskResponseDto(
                task.getId(),
                task.getName(),
                task.getTaskProfile().getDescription(),
                task.getTaskProfile().getIsCompleted(),
                task.getTaskProfile().getStartDate(),
                task.getTaskProfile().getEndDate()
                
        );
    }

    
   



    
}
