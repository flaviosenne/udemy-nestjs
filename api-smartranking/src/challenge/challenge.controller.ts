import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { MatchChallengeDto } from './dto/match-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe';

@Controller('/api/v1/challenges')
export class ChallengeController {
    constructor(private readonly service: ChallengeService){  }

    private readonly logger = new Logger(ChallengeController.name)
    
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() dto: CreateChallengeDto): Promise<Challenge> {
        this.logger.log(`createChallengeDto: ${JSON.stringify(dto)}`)
        return await this.service.create(dto)
    }

    @Get()
    async getAll(
        @Query('idJogador')_id: string
    ): Promise<Array<Challenge>> {
        return _id ? await this.service.getByJogadorId(_id) : 
        await this.service.getAll()

    }

    @Put('/:desafio')
    async update(
        @Param('desafio') _id:  string,
        @Body(ChallengeStatusValidationPipe) dto: UpdateChallengeDto
    ): Promise<void>{
        await this.service.update(_id, dto)
    }

    @Post('/:challenge/match')
    async postMatchChallenge(
        @Param('challenge') _id: string,
        @Body(ValidationPipe) dto: MatchChallengeDto
    )
    {
        await this.service.postMatchChallenge(_id, dto)
    }

}
