package com.projen.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projen.backend.model.Project;


public interface ProjectRepository extends JpaRepository<Project, Long> {

}
