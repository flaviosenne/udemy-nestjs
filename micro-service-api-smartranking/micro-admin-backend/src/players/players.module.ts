import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from 'src/interfaces/players/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [
    MongooseModule
    .forFeature([
      {name: 'Player', schema: PlayerSchema}]
      )
  ],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
