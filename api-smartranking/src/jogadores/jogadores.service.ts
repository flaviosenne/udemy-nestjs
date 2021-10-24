import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
        
    private jogadores: Jogador[] = []

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async createUpdateJogador(dto: CreateJogadorDto): Promise<void>{
        const { email }= dto

        const existJogador = await this.jogadorModel.findOne({email}).exec()

        existJogador ? this.update(dto) : this.create(dto)

    }
    
    async getJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async getJogadorByEmail(email: string): Promise<Jogador> {
        const existJogador = this.jogadores.find(jogador => jogador.email === email)

        if(!existJogador) throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        
        return existJogador 
    }

    private async create(dto: CreateJogadorDto): Promise<Jogador>{
        return await new this.jogadorModel(dto).save()
    }

    private async update(dto: CreateJogadorDto): Promise<void> {
        await this.jogadorModel.findOneAndUpdate(
            {email: dto.email}, {$set: dto})
            .exec()
    }

    async deleteJogadorByEmail(email: string): Promise<void> {
        await this.jogadorModel.deleteOne({email}).exec()
        
    }

}
