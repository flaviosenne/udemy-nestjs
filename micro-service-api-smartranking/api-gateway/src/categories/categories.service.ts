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


    get(_id: string): Observable<any> {
        return this.queueProxy.send('get-categories', _id ? _id : '')
    }

    update(dto: UpdateCategoryDto, id: string) {
        this.queueProxy.emit('update-category', { id, category: dto })
    }
}
