package com.custard.notificationservice.Controller;

import com.custard.notificationservice.Service.MailService;
import lombok.AllArgsConstructor;
import org.custard.model.MailStructure;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notification")
@AllArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping(path = "/send/{mail}")
    public String sendMail(@PathVariable String mail, @RequestBody MailStructure mailStructure){
        mailService.sendMail(mail, mailStructure);
        return "Mail sent successfully";
    }
}
