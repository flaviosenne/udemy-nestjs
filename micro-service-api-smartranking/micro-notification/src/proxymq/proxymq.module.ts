import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxySmartRanking } from './client-proxy';

@Module({
  imports: [ProxymqModule, ConfigModule.forRoot({isGlobal: true})],
  providers: [ClientProxySmartRanking],
  exports: [ClientProxySmartRanking]
})
export class ProxymqModule {}
