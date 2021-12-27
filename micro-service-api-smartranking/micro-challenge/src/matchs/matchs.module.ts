import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './interface/match.schema';
import { ProxymqModule } from 'src/proxymq/proxymq.module';

@Module({
  imports: [
    MongooseModule
    .forFeature([
      {name: 'Match', schema: MatchSchema}]
      ),
      ProxymqModule
  ],
  providers: [MatchsService],
  controllers: [MatchsController]
})
export class MatchsModule {}
