import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { ChallengeStatus } from './interface/challenge-status.enum';
import { Challenge } from './interface/challenge.interface';

@Injectable()
export class ChallegesService {
    constructor(
        @InjectModel('Challenge')
        private readonly model: Model<Challenge>, 
        private readonly playerService: PlayersService,
        private readonly categoryService: CategoriesService) { }

    logger: Logger = new Logger(ChallegesService.name)

    async save(entity: Challenge) {

        const players = await this.playerService.get()

        entity.players.map(player => {

            const existPlayer = players.filter(player => player._id == player._id)

            if (existPlayer.length === 0) throw new BadRequestException(`O id ${player._id} não é jogador`)
        })

        const requesterExistsInMatch = entity.players.filter(player => player._id == entity.requester)

        this.logger.log(`requesterExistsInMatch: ${requesterExistsInMatch}`)

        if (requesterExistsInMatch.length == 0) {
            throw new BadRequestException(`O solicitante deve ser um jogador da partida`)
        }

        const categoryPlayer = await this.categoryService.findByUserId(entity.requester, players)

        const challengeToSaved = new this.model(entity)
        challengeToSaved.category = categoryPlayer
        challengeToSaved.dateHourRequest = new Date()
        this.logger.log(`challengeToSaved.dateHourChallenge: ${challengeToSaved.dateHourChallenge} `)

        challengeToSaved.status = ChallengeStatus.PENDENT
        this.logger.log(`Challenge create: ${JSON.stringify(challengeToSaved)}`)

        return await challengeToSaved.save()

    }
}
