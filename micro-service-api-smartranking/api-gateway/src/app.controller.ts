import { Controller, Post, Logger, UsePipes, ValidationPipe, Body, Query, Get, Put, Param } from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices'
import { Observable } from 'rxjs';
import { CreateCategoryDto } from './dtos/create-catedory.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name)

  private clientAdminBackEnd: ClientProxy

  constructor() {
    this.clientAdminBackEnd = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls:['amqps://vcrcblpo:FMqPXeb283pl9oumB-mRu3XKCYv_kl6g@fish.rmq.cloudamqp.com/vcrcblpo'],
        queue: 'admin-backend'
      }
    })
  }

  @Post('/categories')
  @UsePipes(ValidationPipe)
  createCategory( @Body() dto: CreateCategoryDto){
    this.clientAdminBackEnd.emit('create-category', dto)
  }


  @Get('/categories')
  getCategory(@Query('idCategory')_id:string): Observable<any>{
    return this.clientAdminBackEnd.send('get-categories', _id ? _id: '')
  }

  @Put('/categories/:_id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Body() dto: UpdateCategoryDto,
    @Param('_id') id: string){
    this.clientAdminBackEnd.emit('update-category', {id, category: dto})
  }

 
}
