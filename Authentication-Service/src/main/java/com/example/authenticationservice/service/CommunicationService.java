package com.example.authenticationservice.service;

import com.example.authenticationservice.models.MailStructure;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class CommunicationService {
    HttpHeaders httpHeaders;
    private final RestTemplate restTemplate;
    final String NOTIFICATION_SERVICE_URL = "http://localhost:8762/api/v1/notification/send/{mail}";
    public void SendMail(String recipient, MailStructure mailStructure){
        httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        // prepare the request
        HttpEntity<MailStructure> request
                = new HttpEntity<MailStructure>
                (mailStructure, httpHeaders);
        // make the request
        ResponseEntity<String> response = restTemplate.exchange(
                NOTIFICATION_SERVICE_URL,
                HttpMethod.POST,
                request,
                String.class,
                recipient
                );
        // check status response
        if (response.getStatusCode() == HttpStatus.OK) {
            System.out.println("Mail sent successfully.");
        } else {
            System.out.println(response.getBody());
            System.out.println("Failed to send mail.");
        }
    }
}
