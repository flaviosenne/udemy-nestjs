import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CreateJogadorDto} from './dtos/create-jogador.dto'
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidationParamsPipe } from './pipes/jogadores-validation-params.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){  }

    @Post()
    @UsePipes(ValidationPipe)
    async createUpdateJogador(@Body() dto: CreateJogadorDto) {
        await this.jogadoresService.createUpdateJogador(dto)
    }

    @Get()
    async getJogador(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        return email ? 
        await this.jogadoresService.getJogadorByEmail(email):
        await this.jogadoresService.getJogadores()
    }

    @Delete()
    async deleteJogador(@Query('email', JogadoresValidationParamsPipe) email: string): Promise<void>{
        this.jogadoresService.deleteJogadorByEmail(email)
    }
}
