package com.example.authenticationservice.service;

import com.example.authenticationservice.Repository.UserRepository;
import com.example.authenticationservice.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordManagerService passwordManagerService;
    private final KafkaService kafkaService;

    public User GetUser(String email){
        return userRepository.searchUserByEmail(email).orElse(null);
    }
    public User createAccount(User userDetail){
        User user;
        Optional<User> student = userRepository.searchUserByEmail(userDetail.getEmail());
        if(student.isPresent()){
            return null;
        }
        user = userRepository.save(userDetail);
        //create a new password for the new user
        String newPassword = passwordManagerService.AddPassword(user);
        //send the new password topic to the user's mail asynchronously
        kafkaService.SendNewPassword(userDetail, newPassword);
        return user;
    }
    public User deleteAccount(String userID){
        Optional<User> student = userRepository.findById(UUID.fromString(userID));
        if(student.isPresent()){
            userRepository.delete(student.get());
            return student.get();
        }else{
            return null;
        }
    }
}
