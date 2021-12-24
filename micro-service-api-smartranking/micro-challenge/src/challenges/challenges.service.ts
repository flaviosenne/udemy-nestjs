import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChallengeStatus } from './interface/challenge-status.enum';
import { Challenge } from './interface/challenge.interface';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectModel('Challenge')
        private readonly model: Model<Challenge>) { }

    logger: Logger = new Logger(ChallengesService.name)

    async save(entity: Challenge) {
        try {

            const challenge = new this.model(entity)
            challenge.dateHourRequest = new Date()

            challenge.status = ChallengeStatus.PENDENT

            this.logger.log(`challenge save: ${JSON.stringify(challenge)}`)

            return await challenge.save()

        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error)}`)
            throw new RpcException(error.message)
        }
    }

    async getAll(): Promise<Array<Challenge>> {
        try {
            return await this.model.find().exec()
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }

    }

    async getByJogadorId(_id: any): Promise<Array<Challenge>> {
        try {
            return await this.model.find()
                .where('players')
                .in(_id)
                .exec()
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async getChallengeById(_id: any): Promise<Challenge> {
        try {
            return await this.model.findOne({ _id }).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async updateChallenge(_id: string, entity: Challenge): Promise<void> {
        try {
            entity.dateHourResponse = new Date()
            await this.model.findOneAndUpdate({ _id }, { $set: entity }).exec()
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async updateChallengeMatch(idMatch: string, entity: Challenge): Promise<void> {
        try {
            entity.status = ChallengeStatus.REALIZED
            entity.match = idMatch
            await this.model.findOneAndUpdate({ _id: entity._id }, { $set: entity }).exec()
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async deleteChallenge(entity: Challenge): Promise<void> {
        try {
            const { _id } = entity
            
            entity.status = ChallengeStatus.CANCELED
            this.logger.log(`challenge: ${JSON.stringify(entity)}`)
            await this.model.findOneAndUpdate({_id},{$set: entity}).exec() 
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }




}