import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from './interfaces/match.interface';
import { Ranking } from './interfaces/ranking.schema';

@Injectable()
export class RankingsService {

    constructor(
        @InjectModel('Ranking') private model: Model<Ranking>

    ){}

    private readonly logger = new Logger(RankingsService.name)

    async proccessMatch(idMatch: string, match: Match): Promise<void>{
        this.logger.log(`idMatch: ${idMatch} match: ${JSON.stringify(match)}`)

        match.players.map(player => {
            const ranking = new this.model()

            ranking.category = match.category
            ranking.challenge = match.challenge
            ranking.match = idMatch
            ranking.player = player

            if(player == match.def){
                ranking.event = 'VITORIA'
                ranking.points = 30
                ranking.operation = '+'
            }else{
                ranking.event = 'DERROTA'
                ranking.points = 0
                ranking.operation = '+'
            }

            this.logger.log(`ranking: ${JSON.stringify(ranking)}`)

            ranking.save()
        })
    }
}
