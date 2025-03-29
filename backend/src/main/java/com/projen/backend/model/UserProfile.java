package com.projen.backend.model;

import java.time.LocalDate;

import org.springframework.cglib.core.Local;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "_user_profile")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String firstName;
    private String lastName;
    private String bio;
    private String avatarUrl;
    private LocalDate dateOfBirth;
    private LocalDate createdAt;
    
    @OneToOne(mappedBy = "userProfile")
    private User user;
} 