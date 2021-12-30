import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';

@Injectable()
export class RankingsService {
    constructor(private readonly proxy: ClientProxySmartRanking) { }

    private readonly proxyAdminBackEnd = this.proxy.getClientProxyRankingInstance()

    async getRankings(categoryId: string, dateRef: string): Promise<any> {

        if (!categoryId) throw new BadRequestException('O id da categoria é obrigatório')

        return await this.proxyAdminBackEnd.send('get-rankings', { categoryId, dateRef: dateRef ? dateRef : '' }).toPromise()
    }
}
