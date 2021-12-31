package com.micro.auth.controller;

import com.micro.auth.constants.RabbitConstants;
import com.micro.auth.dto.ConsumerListenDto;
import com.micro.auth.dto.LoginDto;
import com.micro.auth.dto.RegisterDto;
import com.micro.auth.dto.ResponseLoginDto;
import com.micro.auth.service.AuthService;
import com.rabbitmq.client.Channel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService service;

    @RabbitListener(queues = RabbitConstants.AUTH_QUEUE,id = "register-user")
    public void register(@Payload ConsumerListenDto<RegisterDto> dto, Message message, Channel channel){
        log.info("register: {}", dto.getData());
        service.register(dto.getData());

    }

    @RabbitListener(queues = RabbitConstants.AUTH_QUEUE, id = "login")
    public ResponseLoginDto login(@Payload ConsumerListenDto<LoginDto> dto,Message message, Channel channel){
        log.info("login: {}", dto.getData());
        return service.login(dto.getData());
    }
}
