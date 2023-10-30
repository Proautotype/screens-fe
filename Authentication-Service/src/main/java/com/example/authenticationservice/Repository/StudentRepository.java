package com.example.authenticationservice.Repository;

import com.example.authenticationservice.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {
    Optional<Student> searchStudentByEmail(String email);
}
