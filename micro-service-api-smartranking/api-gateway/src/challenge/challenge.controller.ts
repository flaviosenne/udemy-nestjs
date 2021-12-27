import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { AddChallengeMatchDto } from './dto/add-challenge-match';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeStatus } from './enums/challenge-status.enum';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe';

@Controller('api/v1/challenges')
export class ChallengeController {

    private logger = new Logger(ChallengeController.name)
    private queueProxyChallenge = this.proxy
    .getClientProxyChallengeInstance()
    private queueProxyAdminBackEnd = this.proxy
    .getClientProxyAdminBackEndInstance()


    constructor(private proxy: ClientProxySmartRanking){}

    @Post()
    @UsePipes(ValidationPipe)
    async save(@Body() dto: CreateChallengeDto){
        this.logger.log(`create challenge: ${JSON.stringify(dto)}`)

        const players: any = this.queueProxyAdminBackEnd.send('get-players', '')

        dto.players.map(playerDto => {
            const playerFilter = players.filter(player => player._id == playerDto._id)

            this.logger.log(`playerFilter: ${JSON.stringify(playerFilter)}`)

            if(playerFilter.length == 0) throw new BadRequestException(`O id ${playerDto._id} não é um jogador`)

            if(playerFilter[0].category != dto.category) throw new BadRequestException(`O jogador ${playerFilter[0]._id} não faz parte da categoria informada`)
        })

        const requesterIsPlayerMatch = dto.players.filter(player => player._id == dto.requester)

        this.logger.log(`requesterIsPlayerMatch: ${JSON.stringify(requesterIsPlayerMatch)}`)

        if(requesterIsPlayerMatch.length == 0) throw new BadRequestException(`O solicitante deve ser um jogador da partida`)

        const category = this.queueProxyAdminBackEnd.send('get-categories', dto.category)

        this.logger.log(`category: ${JSON.stringify(category)}`)

        if(!category) throw new BadRequestException('Categoria informada não existe')

        this.queueProxyChallenge.emit('create-challenge', dto)
    }

    @Get()
    get(@Query('playerId') playerId: string){
        if(playerId){
            const player = this.queueProxyAdminBackEnd.send('get-players', playerId)
            this.logger.log(`plyaer: ${JSON.stringify(player)}`)
            if(!player) throw new BadRequestException('Jogador não cadastrado')
        }
        return this.queueProxyChallenge.send('get-challenges', {playerId, _id: ''})

    }

    @Put('/:challenge-id')
    async updateChallenge(
        @Body(ChallengeStatusValidationPipe) dto: UpdateChallengeDto,
        @Param('challenge-id') _id: string
    ){

        const challenge = this.queueProxyChallenge.send('get-challenges', {playerId: '', _id})

        this.logger.log(`challenge: ${JSON.stringify(challenge)}`)

        if(!challenge) throw new BadRequestException('Desafio não encontrado')

        if(challenge['status'] != ChallengeStatus.PENDENT) throw new BadRequestException('Somente desafios com status PENDENTE podem ser atualizados')

        this.queueProxyChallenge.emit('update-challenge', {_id, challenge: dto})
    }
    
    @Put('/:id')
    async deleteChallenge(
        @Param('id') _id: string
    ){

        const challenge = this.queueProxyChallenge.send('get-challenges', {playerId: '', _id})

        this.logger.log(`challenge: ${JSON.stringify(challenge)}`)

        if(!challenge) throw new BadRequestException('Desafio não encontrado')
        
        this.queueProxyChallenge.emit('delete-challenge', challenge)
    }

    @Post('/:challenge-id/match')
    async addChallengeMatch(
        @Body(ValidationPipe) dto: AddChallengeMatchDto,
        @Param('challenge-id') _id: string
    ){

        const challenge = this.queueProxyChallenge.send('get-challenges', {playerId: '', _id})

        this.logger.log(`challenge: ${JSON.stringify(challenge)}`)

        if(!challenge) throw new BadRequestException('Desafio não encontrado')

        if(challenge['status'] == ChallengeStatus.REALIZED) throw new BadRequestException('Desafio já realizado')
        
        if(challenge['status'] != ChallengeStatus.ACCEPT) throw new BadRequestException('Partidas somente podem ser lançadas em dasfios aceitos pelos adversários')
    
        if(!challenge['players'].include(dto.def)) throw new BadRequestException('O jogador vencedor da partida deve fazer parte do desafio') 
    
        const match: any = {}
        match.category = challenge['category']
        match.def = dto.def
        match.challenge = _id
        match.players = challenge['players']
        match.result = dto.result

        this.queueProxyChallenge.emit('create-match', match)

    
    }

}
