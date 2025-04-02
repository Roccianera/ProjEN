package com.projen.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.projen.backend.dto.MapperDto;
import com.projen.backend.dto.ProjectRequestDto;
import com.projen.backend.service.OpenAiService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/api/public/ai")
@RequiredArgsConstructor
public class OpenAiController {

    private final OpenAiService openAiService;

    private final MapperDto mapperDto;





    @PostMapping("/project")
    public ResponseEntity<?> createProject(@RequestBody String prompt) throws JsonProcessingException {

        //TODO refactor.
        
        String schema = mapperDto.jsonSchemaGenerator(ProjectRequestDto.class);
        
        String response =openAiService.generateObjectFromPromptandSchema(prompt,schema);
        
        
        return ResponseEntity.ok().body(response);        
    }
    

}
