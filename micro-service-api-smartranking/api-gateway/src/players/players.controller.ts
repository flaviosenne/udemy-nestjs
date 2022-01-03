import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { UpdatePlayerDto } from 'src/players/dto/update-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private service: PlayersService) { }
    

    @Post()
    @UsePipes(ValidationPipe)
    async save(@Body() dto: CreatePlayerDto) {
        await this.service.save(dto)
    }


    @Get()
    async get(@Query('idPlayer') _id: string,@Req() req: Request) {
        console.log('req: ',req.user)
        return await this.service.get(_id)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async update(@Body() dto: UpdatePlayerDto,@Param('_id') id: string) {
        await this.service.update(dto, id)
    }

    @Delete('/:_id')
    @UsePipes(ValidationPipe)
    delete(@Param('_id') id: string) {
        this.service.delete(id)
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Param('id') id: string){
        return await this.service.uploadFile(file, id)
    }
}
