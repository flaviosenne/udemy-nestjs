package com.micro.auth.proxymq;

import com.micro.auth.constants.RabbitConstants;
import com.rabbitmq.client.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ClientProxy<DTO extends Object> {

    public void publishMessage(DTO message, String topic){
        ConnectionFactory factory = new ConnectionFactory();

        try (Connection connection = factory.newConnection()) {

            Channel channel = connection.createChannel();
            channel.queueDeclare(RabbitConstants.AUTH_QUEUE, false, false, false, null);
            channel.basicPublish(topic, RabbitConstants.AUTH_QUEUE, null,message.toString().getBytes(StandardCharsets.UTF_8));

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public String listenerTopic(){
        ConnectionFactory factory = new ConnectionFactory();

        try (Connection connection = factory.newConnection()) {
            Channel channel = connection.createChannel();
            channel.queueDeclare(RabbitConstants.AUTH_QUEUE, false, false, false, null);
            Consumer consumer = new DefaultConsumer(channel) {
                @Override
                public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                    String message = new String(body, StandardCharsets.UTF_8);
                    System.out.println("Message receive: " + message);
                }
            };
            return channel.basicConsume(RabbitConstants.AUTH_QUEUE, true, consumer);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


}


