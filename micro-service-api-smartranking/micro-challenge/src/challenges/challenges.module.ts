import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interface/challenge.schema';


@Module({
  imports: [
    MongooseModule
    .forFeature([
      {name: 'Challenge', schema: ChallengeSchema}]
      )
  ],
  providers: [ChallengesService],
  controllers: [ChallengesController]
})
export class ChallengesModule {}
