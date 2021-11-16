import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { ProxyRMQModule } from './proxymq/proxymq.module';


@Module({
  imports: [CategoriesModule, PlayersModule, ProxyRMQModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
