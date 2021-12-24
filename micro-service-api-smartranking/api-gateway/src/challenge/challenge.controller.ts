import { BadRequestException, Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { CreateChallengeDto } from './dto/create-challenge.dto';

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
    get(@Query('playerId') _id: string){
        return this.queueProxyChallenge.send('get-challenges', _id ? _id : '')

    }
}
