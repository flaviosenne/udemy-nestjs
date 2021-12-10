import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { ChallengeController } from './challenge.controller';

@Module({
  controllers: [ChallengeController],
  imports: [ProxyRMQModule]
})
export class ChallengeModule {}
