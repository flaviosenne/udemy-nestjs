import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ackErrors } from 'src/utils/list-errors.util';
import { ChallegesService } from './challeges.service';
import { Challenge } from './interface/challenge.interface';

@Controller()
export class ChallegesController {

    constructor(private readonly service: ChallegesService){}

    logger: Logger = new Logger(ChallegesController.name)

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
}
