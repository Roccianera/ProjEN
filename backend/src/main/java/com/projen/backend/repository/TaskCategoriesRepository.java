package com.projen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projen.backend.model.TaskCategory;

public interface TaskCategoriesRepository extends JpaRepository<TaskCategory, Long> {



  

}
