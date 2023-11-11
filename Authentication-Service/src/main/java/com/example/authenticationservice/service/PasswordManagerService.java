package com.example.authenticationservice.service;

import com.example.authenticationservice.Repository.PasswordManagerRepository;
import com.example.authenticationservice.models.PasswordManager;
import com.example.authenticationservice.models.User;
import com.example.authenticationservice.utils.PasswordStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordManagerService {
    private final PasswordManagerRepository passwordManagerRepository;
    private final PasswordManager passwordManager;

    public <T extends User> String AddPassword(T user){
        PasswordManager pm;
        pm = new PasswordManager();
        pm.setStatus(PasswordStatus.INITIAL);
        // set initial password using username and email
        String initial = user.getFirstName()+user.getLastName()+user.getEmail();
        pm.setPassword(initial);
        passwordManagerRepository.save(pm);
        return initial;
    }

    public boolean ComparePassword(String id, String password){
        Optional<PasswordManager> passwordManagerOptional = passwordManagerRepository.findById(UUID.fromString(id));
        if(passwordManagerOptional.isPresent()){
            PasswordManager pm = passwordManagerOptional.get();
            return passwordManagerOptional.get().checkPassword(password, pm.getPassword());
        }
        return false;
    }
}
