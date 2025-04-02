package com.projen.backend.service;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.projen.backend.dto.MapperDto;
import com.projen.backend.dto.ProjectRequestDto;
import com.projen.backend.dto.ProjectResponseDto;
import com.projen.backend.dto.TaskCategoryRequestDto;
import com.projen.backend.dto.TaskCategoryResponseDto;
import com.projen.backend.dto.TaskRequestDto;
import com.projen.backend.dto.TaskResponseDto;
import com.projen.backend.exception.ResourceNotFound;
import com.projen.backend.exception.TaskNotFoundException;
import com.projen.backend.model.Project;
import com.projen.backend.model.Task;
import com.projen.backend.model.TaskCategory;
import com.projen.backend.repository.ProjectRepository;
import com.projen.backend.repository.TaskCategoriesRepository;
import com.projen.backend.repository.TaskRepository;
import com.projen.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final TaskRepository taskRepository;

    public final ProjectRepository projectRepository;
    public final MapperDto mapperDto;
    public final UserRepository userRepository;

    private final TaskCategoriesRepository taskCategoryRepository;




    //hasPermission
    private Project  authorizeProjectHandling(Long id) {
        
        var project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean res =project.getUser().getUsername().equals(authentication.getName()) ;
   
        if(!res) {
            throw new RuntimeException("You do not have permission to access this project");
        }

        return project;
        
    }



    public ProjectResponseDto deleteProject(Long id) {

        var project = authorizeProjectHandling(id);

        projectRepository.delete(project);

        return mapperDto.mapToResponseDto(project);
    }

    public ProjectResponseDto getProjectById(Long id) {

        var project = authorizeProjectHandling(id);

        return mapperDto.mapToResponseDto(project);
    }

    public ProjectResponseDto createProject(ProjectRequestDto projectRequestDto) {


        Project project = mapperDto.mapToProject(projectRequestDto);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        var user = userRepository.findByUsername(authentication.getName());

        project.setUser(user.get());

        var savedProject= projectRepository.save(project);

        return mapperDto.mapToResponseDto(savedProject);
    }

    public ProjectResponseDto updateProject(Long id, ProjectRequestDto projectRequestDto) {
    

        var  project = authorizeProjectHandling(id);


        project.setName(projectRequestDto.name());
  
        project.setDescription(projectRequestDto.description());

        project.setEndDate(projectRequestDto.endDate());


        var savedProject= projectRepository.save(project);

        return mapperDto.mapToResponseDto(savedProject);
        
    }































    public List<ProjectResponseDto> getAllProjects() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<Project> projects = projectRepository.findAllByUser_Username(authentication.getName());

        return projects.stream()
                .map(project -> mapperDto.mapToResponseDto(project))
                .toList();

    }

    public TaskResponseDto updateTaskComplete(Long id_project, Long id_task) {
      
       var project= authorizeProjectHandling(id_project);


       

       Task task=null;

        
       for(TaskCategory category : project.getTaskCategories()) {
            for(Task t : category.getTasks()) {
                if(t.getId().equals(id_task)) {
                    task=t;
                    break;
                }
            }
        }

        if(task==null) {
            throw new TaskNotFoundException("Task not found");
        }

        

        task.setIsCompleted(!task.getIsCompleted());

        taskRepository.save(task);

        return mapperDto.mapToTaskResponseDto(task);

       
    }




    public TaskResponseDto deleteTask(Long id_project, Long id_task) {
        var project= authorizeProjectHandling(id_project);

        Task task=null;

        
        for(TaskCategory category : project.getTaskCategories()) {
            for(Task t : category.getTasks()) {
                if(t.getId().equals(id_task)) {
                    task=t;
                    break;
                }
            }
        }

        if(task==null) {
            throw new TaskNotFoundException("Task not found");
        }

        taskRepository.delete(task);

        return mapperDto.mapToTaskResponseDto(task);
    }

    public TaskResponseDto createTask(Long id_project,Long id_category, TaskRequestDto taskRequestDto) {
        var project= authorizeProjectHandling(id_project);


        var category = taskCategoryRepository.findById(id_category).orElseThrow(() -> new ResourceNotFound("Category not found"));


    
        Task task = mapperDto.mapToTask(taskRequestDto);

        task.setTaskCategory(category);


        taskRepository.save(task);


        return mapperDto.mapToTaskResponseDto(task);
    }





    public TaskCategoryResponseDto createTaskCategory(Long id_project, TaskCategoryRequestDto taskCategoryRequestDto) {
        var project= authorizeProjectHandling(id_project);


        TaskCategory taskCategory = mapperDto.mapToTaskCategory(taskCategoryRequestDto);

        taskCategory.setProject(project);


        taskCategoryRepository.save(taskCategory);


        return mapperDto.mapToTaskCategoryResponseDto(taskCategory);
    }


    public TaskCategoryResponseDto updateTaskCategory(Long id_project, Long id_category, TaskCategoryRequestDto taskCategoryRequestDto) {
        var project= authorizeProjectHandling(id_project);


        var category = taskCategoryRepository.findById(id_category).orElseThrow(() -> new ResourceNotFound("Category not found"));


        category.setName(taskCategoryRequestDto.name());

        taskCategoryRepository.save(category);


        return mapperDto.mapToTaskCategoryResponseDto(category);

    }
    public TaskCategoryResponseDto deleteTaskCategory(Long id_project, Long id_category) {
        var project= authorizeProjectHandling(id_project);


        var category = taskCategoryRepository.findById(id_category).orElseThrow(() -> new ResourceNotFound("Category not found"));


        taskCategoryRepository.delete(category);


        return mapperDto.mapToTaskCategoryResponseDto(category);

    }
    
}
