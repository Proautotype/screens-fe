package com.example.authenticationservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class Student extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
}
