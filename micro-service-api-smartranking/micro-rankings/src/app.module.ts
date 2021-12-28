import { Module } from '@nestjs/common';
import { RankingsModule } from './rankings/rankings.module';
import { ProxymqModule } from './proxymq/proxymq.module';
import {MongooseModule}from '@nestjs/mongoose'
import {ConfigModule}from '@nestjs/config'

@Module({
  imports: [RankingsModule,
  ConfigModule.forRoot({isGlobal: true}),
  MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-players-ranking.ggar0.mongodb.net/sr-ranking?retryWrites=true&w=majority',
    { useUnifiedTopology: true }),
  ProxymqModule

],
  controllers: [],
  providers: [],
})
export class AppModule {}
