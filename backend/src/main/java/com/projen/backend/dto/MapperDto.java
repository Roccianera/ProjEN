package com.projen.backend.dto;

import java.time.LocalDate;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.jsonSchema.JsonSchema;
import com.fasterxml.jackson.module.jsonSchema.JsonSchemaGenerator;
import com.projen.backend.model.Project;
import com.projen.backend.model.Task;
import com.projen.backend.model.TaskCategory;

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
    
        var project = Project.builder()
                .name(projectRequestDto.name())
                .description(projectRequestDto.description())
                .endDate(projectRequestDto.endDate())
                .startDate(LocalDate.now())
                .isCompleted(false)
                .TaskCategories(
                projectRequestDto.taskCategories().stream().map(taskCategoryRequestDto -> mapToTaskCategory(taskCategoryRequestDto)
                )
                .collect(Collectors.toList())
                )
                .build();

        for (TaskCategory tCategory : project.getTaskCategories()) {

                if(tCategory!=null)
                tCategory.setProject(project);
        }

        return project;
    }

    public  TaskCategoryResponseDto mapToTaskCategoryResponseDto(TaskCategory taskCategory) {
        return new TaskCategoryResponseDto(taskCategory.getId(), taskCategory.getName(),
         taskCategory.getTasks().stream().map(task->mapToTaskResponseDto(task)).collect(Collectors.toList()));
    }
    public TaskCategory mapToTaskCategory(TaskCategoryRequestDto taskCategoryRequestDto) {
        var taskCategory= TaskCategory.builder()
                .name(taskCategoryRequestDto.name())
                .tasks(taskCategoryRequestDto.tasks().stream().map(taskRequestDto->mapToTask(taskRequestDto)).collect(Collectors.toList()))
                .build();
                

        for (Task   task : taskCategory.getTasks()) {

            if(task!=null)
            task.setTaskCategory(taskCategory);
        }

        return taskCategory;
    }

    public Task mapToTask(TaskRequestDto taskRequestDto) {

        
        return Task.builder()
        .name(taskRequestDto.name())
        
        .isCompleted(false)
                .description(taskRequestDto.description())
                .startDate(LocalDate.now())
                .endDate(taskRequestDto.endDate())
                .build();
    }

    public TaskResponseDto mapToTaskResponseDto(Task task) {
        return new TaskResponseDto(
                task.getId(),
                task.getName(),
                task.getDescription(),
                task.getIsCompleted(),
                task.getStartDate(),
                task.getEndDate()
                
        );
    }

    public String jsonSchemaGenerator(Class<?>object) throws JsonProcessingException{

        //TODO refactor
        ObjectMapper objectMapper = new ObjectMapper();
		 
		JsonSchemaGenerator schemaGenerator= new JsonSchemaGenerator(objectMapper);
		 
		JsonSchema schema = schemaGenerator.generateSchema(ProjectRequestDto.class);
		 
		String jsonSchema = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(schema);
		 
		return jsonSchema;
    }


   



    
}
