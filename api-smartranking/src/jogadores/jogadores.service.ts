import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateJogadorDto } from './dtos/update-jogador.dto';

@Injectable()
export class JogadoresService {
        
    private jogadores: Jogador[] = []

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async create(dto: CreateJogadorDto): Promise<Jogador>{
        const { email }= dto

        const existJogador = await this.jogadorModel.findOne({email}).exec()

        if(existJogador) throw new BadRequestException(`jogador com email ${email} já cadastrado`)
        
        return await new this.jogadorModel(dto).save()

    }

    async update(_id: string, dto: UpdateJogadorDto): Promise<void>{

        await this.getById(_id)

        await this.jogadorModel.findOneAndUpdate({_id}, {$set: dto}).exec()

    }
    
    async getAll(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async getById(_id: string): Promise<Jogador> {
        const existJogador = this.jogadorModel.findOne({_id}).exec()

        if(!existJogador) throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        
        return existJogador 
    }

    async delete(_id: string): Promise<void> {
        await this.getById(_id)

        await this.jogadorModel.deleteOne({_id}).exec()
        
    }

}
