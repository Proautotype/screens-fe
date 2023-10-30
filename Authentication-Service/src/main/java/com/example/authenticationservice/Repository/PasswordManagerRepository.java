package com.example.authenticationservice.Repository;

import com.example.authenticationservice.models.PasswordManager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PasswordManagerRepository extends JpaRepository<PasswordManager, UUID> {
}
