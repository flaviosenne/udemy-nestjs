import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ackErrors } from 'src/utils/list-errors.util';
import { ChallengesService } from './challenges.service';
import { Challenge } from './interface/challenge.interface';

@Controller()
export class ChallengesController {

    constructor(private readonly service: ChallengesService){}

    logger: Logger = new Logger(ChallengesController.name)

    @EventPattern('create-challenge')
    async save(@Payload() challenge: Challenge, @Ctx() context: RmqContext){

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try{

            this.logger.log(`challenge: ${JSON.stringify(challenge)}`)
            await this.service.save(challenge)
            await channel.ack(originalMsg)

        }
        catch(e){
            this.logger.error(`error: ${JSON.stringify(e)}`)

            const filterAckError = ackErrors.filter(
                ackError => e.message.includes(ackError))

            if (filterAckError) await channel.ack(originalMsg)
        
        }
    }

    @MessagePattern('get-challenges')
    async get(@Payload() _id: string, @Ctx() context: RmqContext){
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try{
            return _id ? await this.service.getByJogadorId(_id): 
            await this.service.getAll()
        }catch(e){
            this.logger.error(`error: ${JSON.stringify(e)}`)
        }finally{
            await channel.ack(originalMsg)
        }
    }
}
