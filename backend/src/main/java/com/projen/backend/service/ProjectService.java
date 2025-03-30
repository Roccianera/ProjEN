package com.projen.backend.service;

import org.springframework.stereotype.Service;

import com.projen.backend.dto.ProjectRequestDto;
import com.projen.backend.dto.ProjectResponseDto;
import com.projen.backend.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    public final ProjectRepository projectRepository;



    public ProjectResponseDto deleteProject(Long id) {

        
        return null;

    }

    public ProjectResponseDto getProjectById(Long id) {

        return null ;
    }

    public ProjectResponseDto createProject(ProjectRequestDto projectRequestDto) {

        return null;
    }

    public ProjectResponseDto updateProject(Long id, ProjectRequestDto projectRequestDto) {

        return null;
    }




    
    
}
