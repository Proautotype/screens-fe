package com.example.authenticationservice.service;

import com.example.authenticationservice.Repository.StudentRepository;
import com.example.authenticationservice.models.MailStructure;
import com.example.authenticationservice.models.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final PasswordManagerService passwordManagerService;
    private final CommunicationService communicationService;
    public Student createAccount(Student studentDetails){
        Student _student = null;
        Optional<Student> student = studentRepository.searchStudentByEmail(studentDetails.getEmail());
        if(student.isPresent()){
            return null;
        }
        _student = studentRepository.save(studentDetails);
        //create a new password for the new user
        String newPassword = passwordManagerService.AddPassword(_student);
        // forward the password to the user's mail
        communicationService.SendMail(studentDetails.getEmail(), new MailStructure());
        return _student;
    }
    public Student deleteAccount(String userID){
        Optional<Student> student = studentRepository.findById(UUID.fromString(userID));
        if(student.isPresent()){
            studentRepository.delete(student.get());
            return student.get();
        }else{
            return null;
        }
    }
    public void updateAccount(String userID){
        Optional<Student> student = studentRepository.findById(UUID.fromString(userID));

    }
}
