import { FileService } from "../file.protocol";
import * as AWS from 'aws-sdk'
import { Logger } from "@nestjs/common";
import { AwsS3Config } from "../config/aws-s3.config";

export class FileServiceAwsImpl implements FileService {

    private logger = new Logger(FileServiceAwsImpl.name)

    constructor(private awsS3Confg: AwsS3Config) { }

    async upload(buffer: Buffer, path: string) {
        try {
            const s3 = new AWS.S3({
                region: this.awsS3Confg.AWS_REGION,
                accessKeyId: this.awsS3Confg.AWS_ACCESS_KEY_ID,
                secretAccessKey: this.awsS3Confg.AWS_SECRET_ACCESS_KEY
            })

            this.logger.log(`path: ${path}`)

            const params = {
                Body: buffer,
                Bucket: this.awsS3Confg.AWS_S3_BUCKET_NAME,
                Key: path
            }

            const result = await s3.putObject(params).promise()
            this.logger.log(`result: ${JSON.stringify(result)}`)
            return {
                // https://{name-bucket}.s3-{region}.amazonaws.com/{name-file}
                url: `https://${this.awsS3Confg.AWS_S3_BUCKET_NAME}.s3-${this.awsS3Confg.AWS_REGION}.amazonaws.com/${path}`
            }

        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw error.message
        }
    }

}