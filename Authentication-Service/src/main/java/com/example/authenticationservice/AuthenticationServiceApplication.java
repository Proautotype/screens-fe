package com.example.authenticationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
@EnableDiscoveryClient
public class AuthenticationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthenticationServiceApplication.class, args);
    }

//    @Bean
//    CommandLineRunner commandLineRunner(KafkaTemplate<String, MailStructure> kafkaTemplate){
//        return args -> {
//            MailStructure mailStructure = new MailStructure();
//            mailStructure.setMessage("a message of work");
//            mailStructure.setSubject("blue");
//            mailStructure.setRecipient("ampomah.winston");
////            kafkaTemplate.send(KafkaTopics.NOTIFICATION.name(), mailStructure);
//            kafkaTemplate.send(KafkaTopics.NOTIFICATION.name(), mailStructure);
//        };
//    }
}
