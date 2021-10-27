import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { MatchSchema } from './interfaces/match.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [MongooseModule
    .forFeature([
      {name: 'Challenge', schema: ChallengeSchema},
      {name: 'Match', schema: MatchSchema}
    ]),
    JogadoresModule,
    CategoriesModule
  ],
  providers: [ChallengeService],
  controllers: [ChallengeController]
})
export class ChallengeModule {}
