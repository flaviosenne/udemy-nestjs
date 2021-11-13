import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreatePlayerDto } from 'src/dtos/player/create-player.dto';
import { UpdatePlayerDto } from 'src/dtos/player/update-player.dto';

@Controller('api/v1')
export class PlayersController {
    private logger = new Logger(PlayersController.name)

    private clientAdminBackEnd: ClientProxy

    constructor() {
        this.clientAdminBackEnd = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqps://vcrcblpo:FMqPXeb283pl9oumB-mRu3XKCYv_kl6g@fish.rmq.cloudamqp.com/vcrcblpo'],
                queue: 'admin-backend'
            }
        })
    }

    @Post('/players')
    @UsePipes(ValidationPipe)
    save(@Body() dto: CreatePlayerDto) {
        this.clientAdminBackEnd.emit('create-player', dto)
    }


    @Get('/players')
    get(@Query('idPlayer') _id: string): Observable<any> {
        return this.clientAdminBackEnd.send('get-players', _id ? _id : '')
    }

    @Put('/players/:_id')
    @UsePipes(ValidationPipe)
    update(
        @Body() dto: UpdatePlayerDto,
        @Param('_id') id: string) {
        this.clientAdminBackEnd.emit('update-player', { id, player: dto })
    }

    @Delete('/players/:_id')
    @UsePipes(ValidationPipe)
    delete(@Param('_id') id: string) {
        this.clientAdminBackEnd.emit('delete-player', { id })
    }
}
