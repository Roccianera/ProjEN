package com.projen.backend.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "_taskCategory")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data


public class TaskCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;


    
    @OneToMany(mappedBy = "taskCategory" ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks; 

    @ManyToOne
    private Project project; 
}
