package com.micro.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.micro.auth.constants.RabbitConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RabbitMqService<DTO> {
    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;


    public void sendMessage(String queueName, DTO message){
        try{
            String messageJson = this.objectMapper.writeValueAsString(message);
            this.rabbitTemplate.convertAndSend(queueName, messageJson);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public Object getMessage(){
        try{
            return this.rabbitTemplate.receiveAndConvert(RabbitConstants.AUTH_QUEUE);

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
