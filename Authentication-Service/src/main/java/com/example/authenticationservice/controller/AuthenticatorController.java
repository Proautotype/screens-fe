package com.example.authenticationservice.controller;

import com.example.authenticationservice.dto.SignInDTO;
import com.example.authenticationservice.models.User;
import com.example.authenticationservice.service.PasswordManagerService;
import com.example.authenticationservice.service.UserService;
import com.example.authenticationservice.utils.CustomeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.custard.model.MailStructure;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticatorController {
    private CustomResponse customResponse = new CustomResponse();
    private final CustomResponseWithTokens customResponseWithTokens = new CustomResponseWithTokens();
    private final UserService studentService;

    private final PasswordManagerService passwordManagerService;

    private final KafkaTemplate<String, MailStructure> kafkaTemplate;
    @PostMapping(path= "/signin")
    public ResponseEntity<CustomResponseWithTokens> SignIn(@RequestBody SignInDTO signInDetails){
        //Get user types
        User user = studentService.GetUser(signInDetails.getUser());
        if(user == null){
            customResponseWithTokens.setStatus(CustomeStatus.ERROR.name());
            customResponseWithTokens.setMessage("Account does not exist");
            return ResponseEntity.status(401).body(customResponseWithTokens);
        }
        boolean passed = passwordManagerService.ComparePassword(user.getId().toString(), signInDetails.getPassword());
        customResponseWithTokens.setStatus(passed ? CustomeStatus.SUCCESS.name(): CustomeStatus.ERROR.name());
        customResponseWithTokens.setMessage(passed ? "Signed In": "Password incorrect");
        return ResponseEntity.status(passed ? 200 : 400).body(customResponseWithTokens);
    }

    @PostMapping(path = "/createAccount")
    public ResponseEntity<CustomResponse> CreateAccount(@RequestBody User student){
        //create student entity
       User response = studentService.createAccount(student);
       //set custome-Response details
        customResponse.setStatus(response != null ? CustomeStatus.SUCCESS.name() :CustomeStatus.ERROR.name());
        customResponse.setMessage(response != null ? "Student created with id "+ response.getInstitutionID() : "Account already exist");
        //respond to client
        return ResponseEntity.status(response != null ? 201 : 400).body(customResponse);
    }

    @PostMapping(path = "/update")
    public ResponseEntity<String> UpdateAccount(){
        return ResponseEntity.ok("");
    }

    @PostMapping(path = "/delete")
    public ResponseEntity<CustomResponse> DeleteAccount(@RequestBody String id){
        User user = studentService.deleteAccount(id);
        customResponse = new CustomResponse(user != null ?
                CustomeStatus.SUCCESS.name() :CustomeStatus.ERROR.name(),
                user != null ? "User with id '"+id+"' deleted":"Could not delete, or no such user");
        return ResponseEntity.status(user != null ? 201 : 400).body(customResponse);
    }
}

@Data
@RequiredArgsConstructor
@AllArgsConstructor
class CustomResponse {
    String status;
    String message;
}
@Data
@RequiredArgsConstructor
@AllArgsConstructor
class CustomResponseWithTokens extends CustomResponse{
    public String token;
}