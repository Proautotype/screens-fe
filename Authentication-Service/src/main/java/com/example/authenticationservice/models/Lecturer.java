package com.example.authenticationservice.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Lecturer extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


}
