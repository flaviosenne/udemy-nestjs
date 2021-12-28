import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { RankingsController } from './rankings.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [RankingsController]
})
export class RankingsModule {}
