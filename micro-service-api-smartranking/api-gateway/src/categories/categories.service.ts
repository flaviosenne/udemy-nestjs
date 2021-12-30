import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { CreateCategoryDto } from './dto/create-catedory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private clientProxySmartRanking: ClientProxySmartRanking) { }

    private queueProxy = this.clientProxySmartRanking.getClientProxyAdminBackEndInstance()

    save(dto: CreateCategoryDto) {
        this.queueProxy.emit('create-category', dto)
    }


    async get(_id: string): Promise<any> {
        return await this.queueProxy.send('get-categories', _id ? _id : '').toPromise()
    }

    update(dto: UpdateCategoryDto, id: string) {
        this.queueProxy.emit('update-category', { id, category: dto })
    }
}
