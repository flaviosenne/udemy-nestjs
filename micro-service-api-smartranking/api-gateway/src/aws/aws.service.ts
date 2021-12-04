import { Injectable } from '@nestjs/common';
import { FileService } from './file.protocol';
import { FileServiceNativeImpl } from './impl/file-native-impl';

@Injectable()
export class AwsService {

    private fileService: FileService

    constructor(){
        this.fileService = new FileServiceNativeImpl()
    }
    

    public async uploadFile(file: any, idPlayer: string){
        const fileExtension = file.originalname.split('.')[1]

        const path = `${idPlayer}.${fileExtension}`

        this.fileService.upload(file.buffer, path)
    } 
}
