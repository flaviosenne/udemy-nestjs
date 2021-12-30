import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
  controllers: [ChallengeController],
  imports: [ProxyRMQModule],
  providers: [ChallengeService]
})
export class ChallengeModule {}
