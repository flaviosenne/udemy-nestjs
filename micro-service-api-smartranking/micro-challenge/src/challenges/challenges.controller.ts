import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ackErrors } from 'src/utils/list-errors.util';
import { ChallengesService } from './challenges.service';
import { Challenge } from './interface/challenge.interface';

@Controller()
export class ChallengesController {

    constructor(private readonly service: ChallengesService) { }

    logger: Logger = new Logger(ChallengesController.name)

    @EventPattern('create-challenge')
    async save(@Payload() challenge: Challenge, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {

            this.logger.log(`challenge: ${JSON.stringify(challenge)}`)
            await this.service.save(challenge)
            await channel.ack(originalMsg)

        }
        catch (e) {
            this.logger.error(`error: ${JSON.stringify(e)}`)

            const filterAckError = ackErrors.filter(
                ackError => e.message.includes(ackError))

            if (filterAckError) await channel.ack(originalMsg)

        }
    }

    @MessagePattern('get-challenges')
    async get(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            const { playerId, _id } = data
            this.logger.log(`data: ${JSON.stringify(data)}`)

            if (playerId) return await this.service.getByJogadorId(playerId)

            return _id ?
                await this.service.getChallengeById(_id) :
                await this.service.getAll()

        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error)}`)
        } finally {
            await channel.ack(originalMsg)
        }
    }

    @EventPattern('update-challenge')
    async updateChallenge(@Payload() data: any, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            this.logger.log(`data: ${JSON.stringify(data)}`)
            const _id = data._id
            const challenge: Challenge = data.challenge

            await this.service.updateChallenge(_id, challenge)
            await channel.ack(originalMsg)
        } catch (error) {
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
            if (filterAckError.length > 0) await channel.ack(originalMsg)


        }

    }

    @EventPattern('update-challenge-match')
    async updateChallengeMatch(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            this.logger.log(`data: ${data}`)
            const idMatch: string = data.idMatch
            const challenge: Challenge = data.challenge
            await this.service.addChallengeMatch(idMatch, challenge)
            await channel.ack(originalMsg)
        } catch (error) {
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
            if (filterAckError.length > 0) await channel.ack(originalMsg)


        }

    }

    @EventPattern('delete-challenge')
    async deleteChallenge(@Payload() challenge: Challenge, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try {
            await this.service.deleteChallenge(challenge)
            await channel.ack(originalMsg)
        } catch (error) {
            this.logger.log(`error: ${JSON.stringify(error.message)}`)
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
            if (filterAckError.length > 0) await channel.ack(originalMsg)


        }
    }
}
