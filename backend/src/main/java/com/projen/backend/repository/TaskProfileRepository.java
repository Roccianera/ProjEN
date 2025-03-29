package com.projen.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projen.backend.model.TaskProfile;

public interface TaskProfileRepository extends JpaRepository<TaskProfile, Long> {
    // This interface will automatically inherit CRUD operations from JpaRepository
    // You can add custom query methods here if needed
    
}
