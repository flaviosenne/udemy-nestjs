import { FileService } from "../file.protocol";
import * as AWS from 'aws-sdk'
import { Logger } from "@nestjs/common";
import {ConfigService} from '@nestjs/config'

export class FileServiceAwsImpl implements FileService {

    private logger = new Logger(FileServiceAwsImpl.name)

    constructor(private configService: ConfigService){}

    upload(buffer: Buffer, path: string) {
        const AWS_S3_BUCKET_NAME = this.configService.get<string>('AWS_S3_BUCKET_NAME')
        const AWS_REGION = this.configService.get<string>('AWS_REGION')
        const AWS_ACCESS_KEY_ID = this.configService.get<string>('AWS_ACCESS_KEY_ID')
        const AWS_SECRET_ACCESS_KEY = this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
        
        
        const s3 = new AWS.S3({
            region: AWS_REGION,
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        })

        this.logger.log(`path: ${path}`)

        const params = {
            Body: buffer,
            Bucket: AWS_S3_BUCKET_NAME,
            Key: path
        }

        const data = s3
            .putObject(params)
            .promise()
            .then(_ => { return { 
                url:`https://${AWS_S3_BUCKET_NAME}.s3-${AWS_REGION}.amazonaws.com/${path}` } 
            },
                err => {
                    this.logger.error(err)
                    return err
                }
            )

        return data
    }

}