import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from 'src/categories/dto/create-catedory.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private service: CategoriesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    save( @Body() dto: CreateCategoryDto){
        this.service.save(dto)
    }


    @Get()
    get(@Query('idCategory')_id:string): Observable<any>{
        return this.service.get(_id)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    update(
        @Body() dto: UpdateCategoryDto,
        @Param('_id') id: string){
        this.service.update(dto, id)
    }
}
