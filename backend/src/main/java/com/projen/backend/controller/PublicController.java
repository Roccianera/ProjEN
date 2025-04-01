package com.projen.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.projen.backend.dto.MapperDto;
import com.projen.backend.dto.ProjectRequestDto;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/api/public")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PublicController {


    private final MapperDto mapperDto;
    

    @GetMapping("/")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Welcome to Projen API");
    }

    @GetMapping("/test")
    public String getMethodName() {

        
       try {
        return mapperDto.jsonSchemaGenerator(ProjectRequestDto.class);
       } catch (JsonProcessingException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
       }
        
        
        return "Error";



    }
    

}
