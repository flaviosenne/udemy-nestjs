import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from 'src/categories/dto/create-catedory.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

    private logger = new Logger(CategoriesController.name)

    private queueProxy = this.clientProxySmartRanking
    .getClientProxyAdminBackEndInstance()


    @Post()
    @UsePipes(ValidationPipe)
    save( @Body() dto: CreateCategoryDto){
        this.queueProxy.emit('create-category', dto)
    }


    @Get()
    get(@Query('idCategory')_id:string): Observable<any>{
        return this.queueProxy.send('get-categories', _id ? _id: '')
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    update(
        @Body() dto: UpdateCategoryDto,
        @Param('_id') id: string){
        this.queueProxy.emit('update-category', {id, category: dto})
    }
}
