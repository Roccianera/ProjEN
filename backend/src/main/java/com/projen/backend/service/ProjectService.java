package com.projen.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.projen.backend.dto.MapperDto;
import com.projen.backend.dto.ProjectRequestDto;
import com.projen.backend.dto.ProjectResponseDto;
import com.projen.backend.model.Project;
import com.projen.backend.repository.ProjectRepository;
import com.projen.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    public final ProjectRepository projectRepository;
    public final MapperDto mapperDto;
    public final UserRepository userRepository;


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
        //TODO
        return  null;
    }

    public List<ProjectResponseDto> getAllProjects() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<Project> projects = projectRepository.findAllByUser_Username(authentication.getName());

        return projects.stream()
                .map(project -> mapperDto.mapToResponseDto(project))
                .toList();

    }
    
}
