package com.micro.auth.controller;

import com.micro.auth.constants.RabbitConstants;
import com.micro.auth.dto.ConsumerListenDto;
import com.micro.auth.dto.RegisterDto;
import com.micro.auth.entity.User;
import com.micro.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService service;

    @RabbitListener(queues = RabbitConstants.AUTH_QUEUE)
    public User register(@Payload ConsumerListenDto<RegisterDto> dto){
        log.info("register: {}", dto.getData());
        return service.register(dto.getData());
    }
}
