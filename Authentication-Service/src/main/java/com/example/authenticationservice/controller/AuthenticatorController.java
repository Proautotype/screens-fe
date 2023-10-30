package com.example.authenticationservice.controller;

import com.example.authenticationservice.models.Student;
import com.example.authenticationservice.service.StudentService;
import com.example.authenticationservice.utils.CustomeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticatorController {
    private Response customResponse;
    private final StudentService studentService;

    @PostMapping(path= "/signin")
    public ResponseEntity<String> SignIn(){
        return ResponseEntity.ok("");
    }

    @PostMapping(path = "/createAccount")
    public ResponseEntity<Response> CreateAccount(@RequestBody Student student){
       Student response = studentService.createAccount(student);
        customResponse = new Response(response != null ?
                CustomeStatus.SUCCESS.name() :CustomeStatus.ERROR.name(),
                response != null ? "Student created with id "+ response.getInstitutionID() : "Account already exist");
        return ResponseEntity.status(response != null ? 201 : 400).body(customResponse);
    }

    @PostMapping(path = "/update")
    public ResponseEntity<String> UpdateAccount(){
        return ResponseEntity.ok("");
    }

    @PostMapping(path = "/delete")
    public ResponseEntity<Response> DeleteAccount(@RequestBody String id){
        Student student = studentService.deleteAccount(id);
        customResponse = new Response(student != null ?
                CustomeStatus.SUCCESS.name() :CustomeStatus.ERROR.name(),
                student != null ? "User with id '"+id+"' deleted":"Could not delete, or no such user");
        return ResponseEntity.status(student != null ? 201 : 400).body(customResponse);
    }
}

@Data
@RequiredArgsConstructor
@AllArgsConstructor
class Response{
    String status;
    String message;
}