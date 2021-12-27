import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ackErrors } from 'src/utils/list-errors.util';
import { MatchsService } from './matchs.service';

@Controller()
export class MatchsController {
    constructor(private readonly service: MatchsService){}

    private readonly logger = new Logger(MatchsController.name)

    @EventPattern('create-match')
    async save(@Payload() entity: Math, @Ctx() context: RmqContext){
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try{
            this.logger.log(`match: ${JSON.stringify(entity)}`)
            await this.service.save(entity)
            await channel.ack(originalMsg)
        }catch(error){
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            const filterAck = ackErrors.filter(ackError => error.message.includes(ackError))

            if(filterAck) await channel.ack(originalMsg)
        }
    }
}
