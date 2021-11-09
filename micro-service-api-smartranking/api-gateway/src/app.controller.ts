import { Controller, Post, Logger, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices'
import { CreateCategoryDto } from './dtos/create-catedory.dto';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name)

  private clientAdminBackEnd: ClientProxy

  constructor() {
    this.clientAdminBackEnd = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls:['amqps://twmkrdcz:aU4uAYXk15rcAB3ROeWQcwAq1xk4nTQK@chimpanzee.rmq.cloudamqp.com/twmkrdcz'],
        queue: 'admin-backend'
      }
    })
  }

  @Post('/categories')
  @UsePipes(ValidationPipe)
  createCategory( @Body() dto: CreateCategoryDto){
    return this.clientAdminBackEnd.emit('create-category', dto)
  }

 
}
