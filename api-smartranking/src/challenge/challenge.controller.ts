import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';

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

}
