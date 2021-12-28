import { BadRequestException, Controller, Get, Logger, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';

@Controller('api/v1/rankings')
export class RankingsController {

    constructor(private readonly proxy: ClientProxySmartRanking){}

    private readonly logger = new Logger(RankingsController.name)
    private readonly proxyAdminBackEnd = this.proxy.getClientProxyRankingInstance()

    @Get()
    async getRankings(
        @Query('categoryId') categoryId: string,
        @Query('dateRef') dateRef: string,
        ){

            if(!categoryId) throw new BadRequestException('O id da categoria é obrigatório')

            return this.proxyAdminBackEnd.send('get-rankings', {categoryId, dateRef: dateRef ? dateRef : ''})
    }
}
