package com.projen.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "_task_profile")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class TaskProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String status;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isCompleted;


    @OneToOne(mappedBy = "taskProfile")
    private Task task; // Assuming Task is another entity that has a one-to-one relationship with TaskProfile


  

    
    
}
