package com.projen.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "_task")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "task_profile_id", referencedColumnName = "id")
    private TaskProfile taskProfile; // Assuming TaskProfile is another entity that has a one-to-one relationship with Task 

    @ManyToOne
    private TaskCategory taskCategory; // Assuming TaskCategory is another entity that has a many-to-one relationship with Task
}
