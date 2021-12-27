import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';

@Module({
  providers: [MatchsService],
  controllers: [MatchsController]
})
export class MatchsModule {}
