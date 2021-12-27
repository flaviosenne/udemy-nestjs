import { Module } from '@nestjs/common';
import { ChallengesModule } from './challenges/challenges.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchsModule } from './matchs/matchs.module';
import { ProxymqModule } from './proxymq/proxymq.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-players-ranking.ggar0.mongodb.net/sr-challenge?retryWrites=true&w=majority',
    { useUnifiedTopology: true }),
    ChallengesModule, 
    MatchsModule, 
    ProxymqModule,
    ConfigModule.forRoot({isGlobal: true})
  ]
})
export class AppModule {}
