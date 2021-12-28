import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Match } from './interfaces/match.interface';
import { RankingResponse } from './interfaces/ranking-response.interface';
import { RankingsService } from './rankings.service';

const ackErrors: string[] = ['E1100']

@Controller()
export class RankingsController {

    constructor(private readonly service: RankingsService){}

    private readonly logger = new Logger(RankingsController.name)


    @EventPattern('proccess-match')
    async proccessMatch(@Payload() data: any, @Ctx() context: RmqContext){
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try{
            this.logger.log(`data: ${JSON.stringify(data)}`)
            const idMatch: string = data.idMatch
            const match: Match = data.match

            await this.service.proccessMatch(idMatch, match)
            await channel.ack(originalMsg)

        }catch(error){
            const ackFilter = ackErrors.filter(ack => error.message.includes(ack))

            if(ackFilter.length > 0) await channel.ack(originalMsg) 
        }
    }

    @MessagePattern('get-rankings')
    async getRankings(@Payload() data: any, @Ctx() context: RmqContext)
    : Promise<RankingResponse[] | RankingResponse>{

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try{

            const { categoryId, dateRef } = data

            return await this.service.getRankings(categoryId, dateRef)

        }finally{
            await channel.ack(originalMsg)
        }

    }
}
