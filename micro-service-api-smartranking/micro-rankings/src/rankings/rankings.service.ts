import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash'
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { Category } from './interfaces/categoy.interface';
import { EventName } from './interfaces/event-name.enum';
import { Match } from './interfaces/match.interface';
import { RankingResponse } from './interfaces/ranking-response.interface';
import { Ranking } from './interfaces/ranking.schema';
import * as moment from 'moment-timezone'
import { Challenge } from './interfaces/challenge.interface';

@Injectable()
export class RankingsService {

    constructor(
        @InjectModel('Ranking') private model: Model<Ranking>,
        private readonly proxy: ClientProxySmartRanking

    ){}

    private readonly logger = new Logger(RankingsService.name)
    private readonly proxyAdminBackend = this.proxy.getClientProxyAdminBackEndInstance()
    private readonly proxyChallenge = this.proxy.getClientProxyChallengeInstance()

    async proccessMatch(idMatch: string, match: Match): Promise<void>{
        
        try{

            const category: Category = await this.proxyAdminBackend.send('get-categories', match.category).toPromise()
            
            await Promise.all(match.players.map(async player => {
                const ranking = new this.model()
    
                ranking.category = match.category
                ranking.challenge = match.challenge
                ranking.match = idMatch
                ranking.player = player
    
                if(player == match.def){
                    const eventFilter = category.events.filter(event => event.name == EventName.VICTORY)
                    
                    ranking.event = EventName.VICTORY
                    ranking.points = eventFilter[0].value
                    ranking.operation = eventFilter[0].operation
                }else{
                    const eventFilter = category.events.filter(event => event.name == EventName.DEFEAT)
                    
                    ranking.event = EventName.DEFEAT
                    ranking.points = eventFilter[0].value
                    ranking.operation = eventFilter[0].operation
                }
    
                this.logger.log(`ranking: ${JSON.stringify(ranking)}`)
    
                await ranking.save()
            }))

        }catch(error){
            this.logger.error(`error: ${JSON.stringify(error.message)}`)

            throw new RpcException(error.message)
        }
        
    }

    async getRankings(categoryId: any, dateRef: string): Promise<RankingResponse[] | RankingResponse>{

        try{
            this.logger.log(`catgoryId ${categoryId} dateRef: ${dateRef}`)

            if(!dateRef){
                dateRef = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD')
                this.logger.log(`dateRef: ${dateRef}`)
            }

            const resultRankings = await this.model.find()
            .where('category')
            .equals(categoryId)
            .exec()

            this.logger.log(`resultRankings: ${JSON.stringify(resultRankings)}`)

            const challenges: Challenge[] = await this.proxyChallenge.send('get-challenges-realized',{categoryId, dateRef}).toPromise()
            
            _

            return

        }catch(error){
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }
}
