package com.projen.backend.auth.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser()
    {
       
           Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

           String username = authentication.getName();

           return  ResponseEntity.ok("User Authenticated " +username);

   

    }



}
