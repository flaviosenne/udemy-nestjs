import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { AddChallengeMatchDto } from './dto/add-challenge-match';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeStatus } from './enums/challenge-status.enum';

@Injectable()
export class ChallengeService {
    constructor(private proxy: ClientProxySmartRanking) { }

    private logger = new Logger(ChallengeService.name)
    private queueProxyChallenge = this.proxy.getClientProxyChallengeInstance()
    private queueProxyAdminBackEnd = this.proxy.getClientProxyAdminBackEndInstance()


    async save(dto: CreateChallengeDto) {
        this.logger.log(`create challenge: ${JSON.stringify(dto)}`)

        const players: any = await this.queueProxyAdminBackEnd.send('get-players', '').toPromise()

        dto.players.map(playerDto => {
            const playerFilter = players.filter(player => player._id == playerDto._id)

            this.logger.log(`playerFilter: ${JSON.stringify(playerFilter)}`)

            if (playerFilter.length == 0) throw new BadRequestException(`O id ${playerDto._id} não é um jogador`)

            if (playerFilter[0].category != dto.category) throw new BadRequestException(`O jogador ${playerFilter[0]._id} não faz parte da categoria informada`)
        })

        const requesterIsPlayerMatch = dto.players.filter(player => player._id == dto.requester)

        this.logger.log(`requesterIsPlayerMatch: ${JSON.stringify(requesterIsPlayerMatch)}`)

        if (requesterIsPlayerMatch.length == 0) throw new BadRequestException(`O solicitante deve ser um jogador da partida`)

        const category = await this.queueProxyAdminBackEnd.send('get-categories', dto.category).toPromise()

        this.logger.log(`category: ${JSON.stringify(category)}`)

        if (!category) throw new BadRequestException('Categoria informada não existe')

        this.queueProxyChallenge.emit('create-challenge', dto)
    }

    async get(playerId: string) {
        if (playerId) {
            const player = await this.queueProxyAdminBackEnd.send('get-players', playerId).toPromise()
            this.logger.log(`player: ${JSON.stringify(player)}`)
            if (!player) throw new BadRequestException('Jogador não cadastrado')
        }
        return this.queueProxyChallenge.send('get-challenges', { playerId, _id: '' })

    }

    async updateChallenge(dto: UpdateChallengeDto, _id: string) {
        const challenge = await this.queueProxyChallenge.send('get-challenges', { playerId: '', _id }).toPromise()

        this.logger.log(`challenge: ${JSON.stringify(challenge)}`)

        if (!challenge) throw new BadRequestException('Desafio não encontrado')

        if (challenge['status'] != ChallengeStatus.PENDENT) throw new BadRequestException('Somente desafios com status PENDENTE podem ser atualizados')

        this.queueProxyChallenge.emit('update-challenge', { _id, challenge: dto })
    }

    async deleteChallenge(_id: string) {

        const challenge = await this.queueProxyChallenge.send('get-challenges', { playerId: '', _id }).toPromise()

        this.logger.log(`challenge: ${JSON.stringify(challenge)}`)

        if (!challenge) throw new BadRequestException('Desafio não encontrado')

        this.queueProxyChallenge.emit('delete-challenge', challenge)
    }

    async addChallengeMatch(dto: AddChallengeMatchDto, _id: string) {

        const challenge = await this.queueProxyChallenge.send('get-challenges', { playerId: '', _id }).toPromise()

        this.logger.log(`challenge: ${JSON.stringify(challenge)}`)

        if (!challenge) throw new BadRequestException('Desafio não encontrado')

        if (challenge['status'] == ChallengeStatus.REALIZED) throw new BadRequestException('Desafio já realizado')

        if (challenge['status'] != ChallengeStatus.ACCEPT) throw new BadRequestException('Partidas somente podem ser lançadas em dasfios aceitos pelos adversários')

        if (!challenge['players'].includes(dto.def)) throw new BadRequestException('O jogador vencedor da partida deve fazer parte do desafio')

        const match: any = {}
        match.category = challenge['category']
        match.def = dto.def
        match.challenge = _id
        match.players = challenge['players']
        match.result = dto.result

        this.queueProxyChallenge.emit('create-match', match)
    }

}
