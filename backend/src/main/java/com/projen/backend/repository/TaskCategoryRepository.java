package com.projen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projen.backend.model.TaskCategory;

public interface TaskCategoryRepository extends JpaRepository<TaskCategory, Long> {


    Boolean existsByIdAndProject_User_Username(Long id, String username);

    Boolean existsByIdAndProject_Id(Long id, Long projectId);
  

}
