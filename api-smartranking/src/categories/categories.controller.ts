import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
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

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async update(
        @Body() dto : UpdateCategoryDto,
        @Param('category') category: string
    ): Promise<void>{
        this.service.update(category, dto)
    }

    @Post('/:category/jogadores/:idJogador')
    async putJogadorInCategory(
        @Param() params: string[]
    ): Promise<void>{
        return await this.service.putJogadorInCategory(params)
    }
}
