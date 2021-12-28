import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { Match } from './interface/match.interface';

@Injectable()
export class MatchsService {
    constructor(
        @InjectModel('Match')
        private readonly model: Model<Math>,
        private proxy: ClientProxySmartRanking){}

        private readonly logger = new Logger(MatchsService.name)
        private proxyChallenge = this.proxy.getClientProxyChallengeInstance()
        private proxyRanking = this.proxy.getClientProxyRankingInstance()

        async save(entity: Math): Promise<Match>{
            try{
                const match = new this.model(entity)
                this.logger.log(`create match: ${JSON.stringify(match)}`)
                
                const result = await match.save()
                this.logger.log(`result: ${JSON.stringify(result)}`)
                const idMatch = result._id

                const challenge = await this.proxyChallenge.send('get-challenges', {playerId: '', _id: entity['challenge']}).toPromise()

                await this.proxyChallenge.emit('update-challenge-match', {idMatch, challenge}).toPromise()
            
                return await this.proxyRanking.emit('proccess-match', {idMatch, match}).toPromise()
            
            }catch(error){
                this.logger.error(`error: ${JSON.stringify(error.message)}`)
                throw new RpcException(error.message)
            }
        }
}
