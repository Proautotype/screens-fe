package com.example.authenticationservice.service;

import com.example.authenticationservice.models.User;
import com.example.authenticationservice.utils.KafkaTopics;
import lombok.AllArgsConstructor;
import org.custard.model.MailStructure;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class KafkaService {
    private final KafkaTemplate<String, MailStructure> kafkaTemplate;

    @Async
    public void SendNewPassword(User userDetails, String newPassword){
        try {
            String msg = String.format("Hello %s, your new password %s", userDetails.getFirstName(), newPassword);
            kafkaTemplate.send(KafkaTopics.NOTIFICATION.name(), new MailStructure("Welcome", msg, userDetails.getEmail()));
            CompletableFuture.completedFuture(null);
        }catch (Exception exception){
            System.out.println(exception.getMessage());
        }
    }
}
