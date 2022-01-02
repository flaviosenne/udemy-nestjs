import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[ProxyRMQModule, AwsModule],
  controllers: [AuthController]
})
export class AuthModule {}
