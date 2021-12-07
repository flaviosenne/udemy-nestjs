import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import {ConfigService} from '@nestjs/config'

@Injectable()
export class ClientProxySmartRanking {

    constructor(private configService: ConfigService){}

    getClientProxyAdminBackEndInstance(): ClientProxy {
        const RABBITMQ_USER = this.configService.get<string>('RABBITMQ_USER')
        const RABBITMQ_PASSWORD = this.configService.get<string>('RABBITMQ_PASSWORD')

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls:[`amqps://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@fish.rmq.cloudamqp.com/vcrcblpo`],
                queue: 'admin-backend'
            }
        })
    }
}