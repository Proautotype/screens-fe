package com.example.authenticationservice.Repository;

import com.example.authenticationservice.models.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LecturerRepository extends JpaRepository<Lecturer, UUID> {
}
