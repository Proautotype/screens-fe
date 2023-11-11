package com.custard.notificationservice.Kafka;

import com.custard.notificationservice.Service.MailService;
import lombok.AllArgsConstructor;
import org.custard.model.MailStructure;
import org.json.JSONObject;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class KafkaController {
    private final MailService mailService;
    @KafkaListener(topics = "NOTIFICATION", groupId = "12211")
    public void SimpleMailListener(String data) {
        System.out.println("msg working");
        JSONObject _data = new JSONObject(data);
        String subject = _data.getString("subject");
        String message = _data.getString("message");
        String recipient = _data.getString("recipient");
        MailStructure ms = new MailStructure();
        ms.setMessage(message);
        ms.setSubject(subject);
        mailService.sendMail(recipient, ms);
        System.out.println("msg sent");
    }
}
