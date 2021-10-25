import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/categories.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() dto:CreateCategoryDto): Promise<Category> {
        return await this.service.create(dto)
    }

    @Get()
    async get(): Promise<Array<Category>>{
        return await this.service.get()
    }

    @Get('/:category')
    async getByCategory(@Param('category') category : string): Promise<Category> {
        return await this.service.getByCategory(category)
    }
}
