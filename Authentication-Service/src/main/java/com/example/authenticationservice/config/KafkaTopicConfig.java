package com.example.authenticationservice.config;

import com.example.authenticationservice.utils.KafkaTopics;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic notificationsTopic(){
        return TopicBuilder.name(KafkaTopics.NOTIFICATION.name())
                .build();
    }
}
