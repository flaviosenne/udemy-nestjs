import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateJogadorDto } from './dtos/update-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador') private readonly model: Model<Jogador>){}

    async create(dto: CreateJogadorDto): Promise<Jogador>{
        const { email }= dto

        const existJogador = await this.model.findOne({email}).exec()

        if(existJogador) throw new BadRequestException(`jogador com email ${email} já cadastrado`)
        
        return await new this.model(dto).save()

    }

    async update(_id: string, dto: UpdateJogadorDto): Promise<void>{

        await this.getById(_id)

        await this.model.findOneAndUpdate({_id}, {$set: dto}).exec()

    }
    
    async getAll(): Promise<Jogador[]> {
        return await this.model.find().exec()
    }

    async getById(_id: string): Promise<Jogador> {
        const existJogador = this.model.findOne({_id}).exec()

        if(!existJogador) throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        
        return existJogador 
    }

    async delete(_id: string): Promise<void> {
        await this.getById(_id)

        await this.model.deleteOne({_id}).exec()
        
    }

}
