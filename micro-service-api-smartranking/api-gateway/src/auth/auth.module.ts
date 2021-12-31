import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[ProxyRMQModule],
  controllers: [AuthController]
})
export class AuthModule {}
