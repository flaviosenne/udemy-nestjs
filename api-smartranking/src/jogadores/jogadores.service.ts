import { Injectable, Logger } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuid} from 'uuid'

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = []
    private readonly logger = new Logger(JogadoresService.name)

    async createUpdateJogador(dto: CreateJogadorDto): Promise<void>{
        this.create(dto)
    }

    private create(dto: CreateJogadorDto): void{
        const {email, name, phoneNumber} = dto

        const jogador: Jogador = {
            _id: uuid(),
            name,
            email, 
            phoneNumber, 
            ranking: 'A',
            rankingPosition: 1,
            urlPhotoJogador: 'www.google.com.br/foto123.jpg'
        }
        this.logger.log(`createJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador)
    }
}
