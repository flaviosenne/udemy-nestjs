import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from 'src/dtos/category/create-catedory.dto';
import { UpdateCategoryDto } from 'src/dtos/category/update-category.dto';

@Controller('api/v1')
export class CategoriesController {
    private logger = new Logger(CategoriesController.name)

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
    save( @Body() dto: CreateCategoryDto){
        this.clientAdminBackEnd.emit('create-category', dto)
    }


    @Get('/categories')
    get(@Query('idCategory')_id:string): Observable<any>{
        return this.clientAdminBackEnd.send('get-categories', _id ? _id: '')
    }

    @Put('/categories/:_id')
    @UsePipes(ValidationPipe)
    update(
        @Body() dto: UpdateCategoryDto,
        @Param('_id') id: string){
        this.clientAdminBackEnd.emit('update-category', {id, category: dto})
    }
}
