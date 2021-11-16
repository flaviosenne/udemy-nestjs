import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxySmartRanking {
    getClientProxyAdminBackEndInstance(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls:['amqps://vcrcblpo:FMqPXeb283pl9oumB-mRu3XKCYv_kl6g@fish.rmq.cloudamqp.com/vcrcblpo'],
                queue: 'admin-backend'
            }
        })
    }
}