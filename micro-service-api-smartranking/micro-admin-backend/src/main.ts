import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport} from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls:['amqps://twmkrdcz:aU4uAYXk15rcAB3ROeWQcwAq1xk4nTQK@chimpanzee.rmq.cloudamqp.com/twmkrdcz'],
        queue: 'admin-backend'
    }
  });

  await app.listen()
}
bootstrap();
