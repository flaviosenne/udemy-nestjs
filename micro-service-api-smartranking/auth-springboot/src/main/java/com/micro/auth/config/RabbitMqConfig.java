package com.micro.auth.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.micro.auth.constants.RabbitConstants.AUTH_QUEUE;

@Configuration
public class RabbitMqConfig {

    @Bean
    public Queue queue(){
        return new Queue(AUTH_QUEUE, true);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }


}
