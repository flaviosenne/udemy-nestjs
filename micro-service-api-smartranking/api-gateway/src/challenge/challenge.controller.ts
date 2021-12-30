import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { AddChallengeMatchDto } from './dto/add-challenge-match';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe';

@Controller('api/v1/challenges')
export class ChallengeController {

    constructor(private service: ChallengeService){}

    @Post()
    @UsePipes(ValidationPipe)
    async save(@Body() dto: CreateChallengeDto){
        await this.service.save(dto)
    }

    @Get()
    async get(@Query('playerId') playerId: string){
        return await this.service.get(playerId)
    }

    @Put('/:challengeId')
    async updateChallenge(
        @Body(ChallengeStatusValidationPipe) dto: UpdateChallengeDto,
        @Param('challengeId') _id: string
    ){
       await this.service.updateChallenge(dto, _id)
    }
    
    @Put('/:id')
    async deleteChallenge(@Param('id') _id: string){
        await this.service.deleteChallenge(_id)
    }

    @Post('/:challengeId/match')
    async addChallengeMatch(
        @Body(ValidationPipe) dto: AddChallengeMatchDto,
        @Param('challengeId') _id: string
    ){
      await this.service.addChallengeMatch(dto,_id)
    }

}
