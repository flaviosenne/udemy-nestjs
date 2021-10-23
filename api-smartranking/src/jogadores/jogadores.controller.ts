import { Body, Controller, Post } from '@nestjs/common';
import {CreateJogadorDto} from './dtos/create-jogador.dto'

@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(@Body() dto: CreateJogadorDto) {

        const { email } = dto

        return JSON.stringify({
            email
        })
    }
}
