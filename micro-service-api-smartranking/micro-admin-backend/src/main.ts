import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport} from '@nestjs/microservices'
import * as momentTimezone from 'moment-timezone'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls:['amqps://vcrcblpo:FMqPXeb283pl9oumB-mRu3XKCYv_kl6g@fish.rmq.cloudamqp.com/vcrcblpo'],
      noAck:false,  
      queue: 'admin-backend'
    }
  });

  Date.prototype.toJSON = function(): any{
    return momentTimezone(this)
    .tz('America/Sao_Paulo')
    .format('YYY-MM-DD HH:mm:ss.SSS')
  } 

  await app.listen()
}
bootstrap();
