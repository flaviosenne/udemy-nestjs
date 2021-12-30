import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { UpdatePlayerDto } from 'src/players/dto/update-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private service: PlayersService) { }
    

    @Post()
    @UsePipes(ValidationPipe)
    save(@Body() dto: CreatePlayerDto) {
        this.service.save(dto)
    }


    @Get()
    get(@Query('idPlayer') _id: string): Observable<any> {
        return this.service.get(_id)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    update(@Body() dto: UpdatePlayerDto,@Param('_id') id: string) {
        this.service.update(dto, id)
    }

    @Delete('/:_id')
    @UsePipes(ValidationPipe)
    delete(@Param('_id') id: string) {
        this.service.delete(id)
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Param('id') id: string){
        return this.service.uploadFile(file, id)
    }
}
