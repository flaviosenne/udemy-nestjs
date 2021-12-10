import { Module } from '@nestjs/common';
import { ChallegesService } from './challeges.service';
import { ChallegesController } from './challeges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interface/challenge.schema';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    MongooseModule
    .forFeature([
      {name: 'Challenge', schema: ChallengeSchema}]
      ), CategoriesModule, PlayersModule
  ],
  providers: [ChallegesService],
  controllers: [ChallegesController]
})
export class ChallegesModule {}
