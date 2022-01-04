import { Module } from '@nestjs/common';
import { AwsCognitoConfig } from './config/aws-cognito.config';
import { AwsCognitoService } from './aws-cognito.service';
import { AwsS3Service } from './aws-s3.service';
import { AwsS3Config } from './config/aws-s3.config';

@Module({
  providers: [AwsS3Service, AwsCognitoService, AwsCognitoConfig, AwsS3Config],
  exports: [AwsS3Service,AwsCognitoService, AwsCognitoConfig, AwsS3Config]
})
export class AwsModule {}
