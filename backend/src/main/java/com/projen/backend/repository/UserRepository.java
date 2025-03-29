package com.projen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projen.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Add custom queries if needed
} 