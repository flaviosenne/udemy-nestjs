import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') 
        private readonly model: Model<Category>,
        private readonly jogadoresService: JogadoresService
    ){}

    async create(dto: CreateCategoryDto): Promise<Category> {
        const { category} = dto

        const existCategory = await this.model.findOne({category}).exec()

        if(existCategory) throw new BadRequestException(`Category ${category} já cadastrada`)

        return await new this.model(dto).save()
    }

    async get(): Promise<Array<Category>> {
        return await this.model.find().populate('jogadores').exec()
    }

    async getByCategory(category: string): Promise<Category> {
        const existCategory = await this.model.findOne({category}).populate('jogadores').exec()

        if(!existCategory) throw new NotFoundException(`Categoria ${category} não encontrada`)

        return existCategory
    }

    async update(category: string, dto: UpdateCategoryDto): Promise<void> {
        await this.getByCategory(category)

        await this.model.findOneAndUpdate({category}, {$set: dto}).exec()
    }

    async putJogadorInCategory(params: string[]): Promise<void> {
        const category = params['category']
        const idJogador = params['idJogador']

        const existCategory = await this.getByCategory(category)

        const existJogador = await this.jogadoresService.getById(idJogador)

        const jogadorAlreadyExistInCategory = await this.model.find({category})
        .where('jogadores').in(existJogador._id).exec()

        if(jogadorAlreadyExistInCategory.length > 0) {
            throw new BadRequestException(`Jogador ${idJogador} já está na categoria ${category}`)
        }

        existCategory.jogadores.push(idJogador)

        await this.model.findOneAndUpdate({category}, {$set: existCategory}).exec()

    }
}
