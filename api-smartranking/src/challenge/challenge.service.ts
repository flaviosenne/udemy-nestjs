import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { Challenge, Match } from './interfaces/challenge.interface';

@Injectable()
export class ChallengeService {

    constructor(
        @InjectModel('Challenge') 
        private readonly model: Model<Challenge>,
        @InjectModel('Match') 
        private readonly matchModel: Model<Match>,
        private readonly jogadoresService: JogadoresService,
        private readonly catgoryService: CategoriesService){}

        private readonly logger = new Logger(ChallengeService.name)

    async create(dto: CreateChallengeDto): Promise<Challenge>{

        const jogadores = await this.jogadoresService.getAll()

        dto.jogadores.map(jogadorDto => {
            console.log(jogadorDto)
            const existJogador = jogadores.filter(jogador => jogador._id == jogadorDto._id)

            if(existJogador.length === 0) throw new BadRequestException(`O id ${jogadorDto._id} não é jogador`)
        })

        const requesterExistsInMatch = dto.jogadores.filter(jogador => jogador._id === dto.requester)

        this.logger.log(`requesterExistsInMatch: ${requesterExistsInMatch}`)

        if(requesterExistsInMatch.length == 0){
            throw new BadRequestException(`O solicitante deve ser um jogador da partida`)
        }

        const categoryJogador = await this.catgoryService.findByUserId(dto.requester)

        const challengeToSaved = new this.model(dto)
        challengeToSaved.category = categoryJogador.category
        challengeToSaved.dateHourRequest = new Date()
        this.logger.log(`challengeToSaved.dateHourChallenge: ${challengeToSaved.dateHourChallenge} `)
        
        challengeToSaved.status = ChallengeStatus.PENDENT
        this.logger.log(`Challenge create: ${JSON.stringify(challengeToSaved)}`)
        
        return await challengeToSaved.save()

    }

    async getAll(): Promise<Array<Challenge>> {
        return this.model.find()
        .populate('jogadores')
        .populate('requester')
        .populate('match')
        .exec()
    }

    async getByJogadorId(_id: any): Promise<Array<Challenge>> {
        const jogadores = await this.jogadoresService.getAll()

        const jogadorFilter = jogadores.filter(jogador => jogador._id == _id)

        if(jogadorFilter.length == 0) throw new BadRequestException(`O id: ${_id} não é um jogador`)

        return await this.model.find()
        .where('jogadores')
        .in(_id)        
        .populate('jogadores')
        .populate('requester')
        .populate('match')
        .exec()
    }

    async update(_id: string, dto: UpdateChallengeDto){

        const challenge = await this.model.findOne({_id})

        if(!challenge) throw new NotFoundException(`Desafio com id: ${_id} não encontrado`)

        if(dto.status){
            challenge.dateHourResponse = new Date()
        }

        challenge.status = dto.status
        challenge.dateHourChallenge = dto.dateHourChallenge


        await this.model.findByIdAndUpdate({_id}, {$set: challenge}).exec()
    }
}
