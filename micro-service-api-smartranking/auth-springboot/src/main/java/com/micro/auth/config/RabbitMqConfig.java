package com.micro.auth.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sound.midi.Receiver;

import static com.micro.auth.constants.RabbitConstants.AUTH_QUEUE;
import static com.micro.auth.constants.RabbitConstants.AUTH_QUEUE_TOPIC_REGISTER;

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


//    @Bean
//    Exchange exchange() {
//        return new TopicExchange(AUTH_QUEUE_TOPIC_REGISTER);
//    }

//    @Bean
//    Binding binding(Queue queue, TopicExchange exchange) {
//        return BindingBuilder.bind(queue).to(exchange).with("example");
//    }
//
//    @Bean
//    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
//                                             MessageListenerAdapter listenerAdapter) {
//        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        container.setQueueNames(AUTH_QUEUE);
//        container.setMessageListener(listenerAdapter);
//        return container;
//    }
//
//    @Bean
//    MessageListenerAdapter listenerAdapter(Receiver receiver) {
//        return new MessageListenerAdapter(receiver, "receiveMessage");
//    }
}
