import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AwsService } from 'src/aws/aws.service';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(
        private clientProxySmartRanking: ClientProxySmartRanking,
        private awsService: AwsService) { }

    private logger = new Logger(PlayersService.name)

    private queueProxy = this.clientProxySmartRanking
        .getClientProxyAdminBackEndInstance()


    save(dto: CreatePlayerDto) {
        this.logger.log(`create player: ${JSON.stringify(dto)}`)

        const category = this.queueProxy.send('get-categories', dto.category)

        if (!category) throw new BadRequestException(`Categoria não cadastrada`)

        this.queueProxy.emit('create-player', dto)
    }


    get(_id: string): Observable<any> {
        return this.queueProxy.send('get-players', _id ? _id : '')
    }

    update(dto: UpdatePlayerDto, id: string) {
        const category = this.queueProxy.send('get-categories', dto.category)

        if (!category) throw new BadRequestException(`Categoria não cadastrada`)

        this.queueProxy.emit('update-player', { id, player: dto })
    }

    delete(id: string) {
        this.queueProxy.emit('delete-player', { id })
    }

    async uploadFile(file, id: string) {

        const player = this.queueProxy.send('get-players', id)

        if (!player) throw new BadRequestException('Jogador não encontrado')

        const { url } = await this.awsService.uploadFile(file, id)

        const dto: UpdatePlayerDto = {}
        dto.urlPhoto = url

        this.queueProxy.emit('update-player', { id, player: dto })

        return this.queueProxy.send('get-players', id)

    }

}
