import { Module } from '@nestjs/common';
import { AwsCognitoConfig } from './config/aws-cognito.config';
import { AwsCognitoService } from './aws-cognito.service';
import { AwsS3Service } from './aws-s3.service';

@Module({
  providers: [AwsS3Service, AwsCognitoService, AwsCognitoConfig],
  exports: [AwsS3Service,AwsCognitoService, AwsCognitoConfig]
})
export class AwsModule {}
