package com.projen.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/public")
@CrossOrigin("*")
public class PublicController {



    @GetMapping("/")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Welcome to Projen API");
    }

}
