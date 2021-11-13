import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/categories/category.schema';
import { PlayerSchema } from './interfaces/players/player.schema';
import { PlayersModule } from './players/players.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-jogadores-rankin.ggar0.mongodb.net/sr-admin-backend?retryWrites=true&w=majority',
    { useUnifiedTopology: true }),
    PlayersModule,
    CategoriesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
