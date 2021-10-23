import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuid} from 'uuid'

@Injectable()
export class JogadoresService {
        
    private jogadores: Jogador[] = []
    private readonly logger = new Logger(JogadoresService.name)

    async createUpdateJogador(dto: CreateJogadorDto): Promise<void>{
        const { email }= dto

        const existJogador = this.jogadores.find(jogador => jogador.email === email)

        existJogador ? this.update(existJogador,dto) : this.create(dto)

    }
    
    async getJogadores(): Promise<Jogador[]> {
        return this.jogadores
    }

    async getJogadorByEmail(email: string): Promise<Jogador> {
        const existJogador = this.jogadores.find(jogador => jogador.email === email)

        if(!existJogador) throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        
        return existJogador 
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

    private update(jogador: Jogador, dto: CreateJogadorDto): void {
        const {name} = dto
        
        jogador.name = name
    }

    async deleteJogadorByEmail(email: string): Promise<void> {
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== email)
        
    }

}
