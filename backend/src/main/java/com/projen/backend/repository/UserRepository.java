package com.projen.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projen.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    // Add custom queries if needed

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);
} 
