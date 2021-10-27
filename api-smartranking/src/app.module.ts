import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-jogadores-rankin.ggar0.mongodb.net/smart-ranking?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
    ),
    ChallengeModule,
    JogadoresModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
