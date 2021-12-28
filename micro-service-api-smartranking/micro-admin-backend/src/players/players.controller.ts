import { Controller, Logger, Query } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Player } from 'src/players/interface/player.interface';
import { ackErrors } from 'src/utils/list-errors.util';
import { PlayersService } from './players.service';

@Controller()
export class PlayersController {
    constructor(private readonly service: PlayersService) { }

    logger: Logger = new Logger(PlayersController.name)

    @EventPattern('create-player')
    async save(@Payload() player: Player, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        
        try {
            this.logger.log(`player: ${JSON.stringify(player)}`)
            await this.service.save(player)
            await channel.ack(originalMsg)
        } catch (e) {
            this.logger.error(`error: ${JSON.stringify(e.message)}`)

            const filterAckError = ackErrors.filter(
                ackError => e.message.includes(ackError))

            if (filterAckError.length > 0) await channel.ack(originalMsg)
            
        }
    }

    @MessagePattern('get-players')
    async get(@Payload() _id: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try {
            return _id ? await this.service.getById(_id)
                : await this.service.get()
        } catch (e) {
            this.logger.error(`error: ${JSON.stringify(e.message)}`)
        } finally {
            await channel.ack(originalMsg)
        }
    }

    @EventPattern('update-player')
    async update(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        const _id = data.id
        const player = data.player

        this.logger.log(`player: ${JSON.stringify(player)}`)

        try {
            await this.service.update(_id,player)
            await channel.ack(originalMsg)
        } catch (e) {
            this.logger.error(`error: ${JSON.stringify(e.message)}`)

            const filterAckError = ackErrors.filter(
                ackError => e.message.includes(ackError))

            if (filterAckError.length > 0)  await channel.ack(originalMsg)
            
        }
    }

    @EventPattern('delete-player')
    async delete(@Payload() object: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            await this.service.delete(object.id)
            await channel.ack(originalMsg)
        } catch (e) {
            this.logger.error(`error: ${JSON.stringify(e.message)}`)

            const filterAckError = ackErrors.filter(
                ackError => e.message.includes(ackError))

            if (filterAckError.length > 0)  await channel.ack(originalMsg)
            
        }
    }
}
