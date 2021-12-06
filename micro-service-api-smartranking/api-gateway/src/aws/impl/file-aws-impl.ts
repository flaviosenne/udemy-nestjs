import { FileService } from "../file.protocol";
import * as AWS from 'aws-sdk'
import { Logger } from "@nestjs/common";

export class FileServiceAwsImpl implements FileService {

    private logger = new Logger(FileServiceAwsImpl.name)

    upload(buffer: Buffer, path: string) {
        const s3 = new AWS.S3({
            region: '',
            accessKeyId: '',
            secretAccessKey: ''
        })

        this.logger.log(`path: ${path}`)

        const params = {
            Body: buffer,
            Bucket: '',
            Key: path
        }

        const data = s3
            .putObject(params)
            .promise()
            .then(data => { return { 
                url:`https://bucket-name.s3-region.amazonaws.com/${path}` } 
            },
                err => {
                    this.logger.error(err)
                    return err
                }
            )

        return data
    }

}