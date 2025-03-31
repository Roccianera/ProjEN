package com.projen.backend.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "_project")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data



public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String name;
    private String description;



    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isCompleted;


//TODO Levato Lazy
    @OneToMany(mappedBy = "project" ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskCategory> TaskCategories; 


    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    
}
