import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { JsonWebTokenModule } from 'src/jwt/jwt.module';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[ProxyRMQModule, AwsModule, JsonWebTokenModule],
  controllers: [AuthController]
})
export class AuthModule {}
