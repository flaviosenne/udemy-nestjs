import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/categories/interface/category.schema';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
    imports: [
        MongooseModule
        .forFeature([
          {name: 'Category', schema: CategorySchema}]
          )
      ],
    controllers: [CategoriesController],
    providers: [CategoriesService]
})
export class CategoriesModule {}
