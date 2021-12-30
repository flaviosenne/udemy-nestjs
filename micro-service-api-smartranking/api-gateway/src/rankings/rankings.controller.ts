import { Controller, Get, Query } from '@nestjs/common';
import { RankingsService } from './rankings.service';

@Controller('api/v1/rankings')
export class RankingsController {

    constructor(private service: RankingsService) { }

    @Get()
    async getRankings(
        @Query('categoryId') categoryId: string,
        @Query('dateRef') dateRef: string,
    ) {
        return this.service.getRankings(categoryId, dateRef)
    }
}
