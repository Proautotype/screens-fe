package com.example.authenticationservice.Repository;

import com.example.authenticationservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> searchUserByEmail(String email);
}
