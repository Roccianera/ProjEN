package com.projen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projen.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
 


    
    Boolean  existsByIdAndTaskCategory_Project_User_Username(Long id, String username);

}
