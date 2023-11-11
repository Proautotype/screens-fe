package com.example.authenticationservice.models;

import com.example.authenticationservice.utils.PasswordStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Entity
@Data
@Service
public class PasswordManager {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID userID;
    private String password;

    private PasswordStatus status;

    public void setPassword(String password) {
        String salt = BCrypt.gensalt(12);
        this.password = BCrypt.hashpw(password, salt);
    }

    public String getPassword() {
        return this.password;
    }

    // Method to verify if the input password matches the encrypted password
    public boolean checkPassword(String inputPassword, String hashedPassword) {
        return BCrypt.checkpw(inputPassword, hashedPassword);
    }
}
