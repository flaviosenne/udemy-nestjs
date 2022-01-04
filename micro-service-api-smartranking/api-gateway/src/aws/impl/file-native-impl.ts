import { FileService } from "../file.protocol";
import * as fs from 'fs'
import {resolve} from 'path'

export class FileServiceNativeImpl implements FileService{
    upload(buffer: Buffer, path: string) {
        console.log('path ', path)
        console.log('buffer ', buffer)
        fs.writeFileSync(resolve(__dirname,`${path}`), buffer, 'binary')
        return 'url.example'
    }

}