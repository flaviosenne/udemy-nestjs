import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';

@Controller('challenge')
export class ChallengeController {
    constructor(private readonly service: ChallengeService){  }

    private readonly logger = new Logger(ChallengeController.name)
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() dto: CreateChallengeDto): Promise<Challenge> {
        this.logger.log(`createChallengeDto: ${JSON.stringify(dto)}`)
        return await this.service.create(dto)
    }
}
