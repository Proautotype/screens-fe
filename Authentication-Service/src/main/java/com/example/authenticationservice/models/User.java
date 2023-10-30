package com.example.authenticationservice.models;

import com.example.authenticationservice.utils.Role;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class User {
    private String firstName;
    private String lastName;
    private Role role;
    private String institutionID;
    private String email;
    private String phone;
}
