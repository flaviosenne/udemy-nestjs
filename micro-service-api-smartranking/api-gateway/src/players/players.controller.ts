import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { AwsService } from 'src/aws/aws.service';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { UpdatePlayerDto } from 'src/players/dto/update-player.dto';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';

@Controller('api/v1/players')
export class PlayersController {
    constructor(
        private clientProxySmartRanking: ClientProxySmartRanking,
        private awsService: AwsService) { }
    
    private logger = new Logger(PlayersController.name)

    private clientAdminBackEnd = this.clientProxySmartRanking
    .getClientProxyAdminBackEndInstance()


    @Post()
    @UsePipes(ValidationPipe)
    save(@Body() dto: CreatePlayerDto) {
        this.logger.log(`create player: ${JSON.stringify(dto)}`)
        
        const category = this.clientAdminBackEnd.send('get-categories', dto.category)
        
        if(!category) throw new BadRequestException(`Categoria não cadastrada`)

        this.clientAdminBackEnd.emit('create-player', dto)
    }


    @Get()
    get(@Query('idPlayer') _id: string): Observable<any> {
        return this.clientAdminBackEnd.send('get-players', _id ? _id : '')
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    update(
        @Body() dto: UpdatePlayerDto,
        @Param('_id') id: string) {
        const category = this.clientAdminBackEnd.send('get-categories', dto.category)
        
        if(!category) throw new BadRequestException(`Categoria não cadastrada`)

        this.clientAdminBackEnd.emit('update-player', { id, player: dto })
    }

    @Delete('/:_id')
    @UsePipes(ValidationPipe)
    delete(@Param('_id') id: string) {
        this.clientAdminBackEnd.emit('delete-player', { id })
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file, 
        @Param('id') id: string){

        const player =  this.clientAdminBackEnd.send('get-players', id)

        if(!player) throw new BadRequestException('Jogador não encontrado')

        const { url } = await this.awsService.uploadFile(file, id)

        const dto:UpdatePlayerDto = {}
        dto.urlPhoto = url

        this.clientAdminBackEnd.emit('update-player', {id, player: dto})
        
        return this.clientAdminBackEnd.send('get-players', id) 

    }
}
