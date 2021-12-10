import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallegesModule } from './challeges/challeges.module';

@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-jogadores-rankin.ggar0.mongodb.net/sr-admin-backend?retryWrites=true&w=majority',
    { useUnifiedTopology: true }),
    PlayersModule,
    CategoriesModule,
    ChallegesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
