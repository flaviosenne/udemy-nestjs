import { Module } from '@nestjs/common';
import { ChallengesModule } from './challenges/challenges.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-players-ranking.ggar0.mongodb.net/sr-challenge?retryWrites=true&w=majority',
    { useUnifiedTopology: true })
    ,ChallengesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
