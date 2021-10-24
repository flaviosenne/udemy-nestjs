import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
