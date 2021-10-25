import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly model: Model<Category>){}

    async create(dto: CreateCategoryDto): Promise<Category> {
        const { category} = dto

        const existCategory = await this.model.findOne({category}).exec()

        if(existCategory) throw new BadRequestException(`Category ${category} já cadastrada`)

        return await new this.model(dto).save()
    }

    async get(): Promise<Array<Category>> {
        return await this.model.find()
    }

    async getByCategory(category: string): Promise<Category> {
        const existCategory = await this.model.findOne({category})

        if(!existCategory) throw new NotFoundException(`Categoria ${category} não encontrada`)

        return existCategory
    }
}