import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
@Injectable()
export class ClientProxySmartRanking {
    constructor(private configService: ConfigService) { }

    RABBITMQ_USER = this.configService.get<string>('RABBITMQ_USER')
    RABBITMQ_PASSWORD = this.configService.get<string>('RABBITMQ_PASSWORD')
    RABBITMQ_URL = this.configService.get<string>('RABBITMQ_URL')

    getClientProxyAdminBackEndInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqps://${this.RABBITMQ_USER}:${this.RABBITMQ_PASSWORD}@${this.RABBITMQ_URL}`],
                queue: 'admin-backend'
            }
        })
    }

    getClientProxyChallengeInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqps://${this.RABBITMQ_USER}:${this.RABBITMQ_PASSWORD}@${this.RABBITMQ_URL}`],
                queue: 'challenge'
            }
        })
    }


    getClientProxyRankingInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqps://${this.RABBITMQ_USER}:${this.RABBITMQ_PASSWORD}@${this.RABBITMQ_URL}`],
                queue: 'ranking'
            }
        })
    }

}
