package com.projen.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projen.backend.model.Project;


public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findAllByUser_Username(String name);

    Boolean existsByIdAndUser_Username(Long projectId, String username);

}
