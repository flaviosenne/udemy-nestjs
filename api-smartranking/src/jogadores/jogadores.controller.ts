import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CreateJogadorDto} from './dtos/create-jogador.dto'
import { UpdateJogadorDto } from './dtos/update-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidationParamsPipe } from './pipes/jogadores-validation-params.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly service: JogadoresService){  }

    @Post()
    @UsePipes(ValidationPipe)
    async createJogador(@Body() dto: CreateJogadorDto): Promise<Jogador> {
        return await this.service.create(dto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateJogador(
        @Body() dto: UpdateJogadorDto, 
        @Param('_id', JogadoresValidationParamsPipe) _id: string ): Promise<void> {
        await this.service.update(_id, dto)
    }

    @Get()
    async getJogadores(): Promise<Jogador[]> {
        return await this.service.getAll()
    }

    @Get('/:_id')
    async getJogador(
        @Param('_id') _id: string): Promise<Jogador> {
        return await this.service.getById(_id)
    }

    @Delete('/:_id')
    async deleteJogadorById(
        @Param('_id') _id: string): Promise<void>{
        this.service.delete(_id)
    }
}
