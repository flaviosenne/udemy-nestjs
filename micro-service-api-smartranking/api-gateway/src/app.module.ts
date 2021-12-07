import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { ProxyRMQModule } from './proxymq/proxymq.module';
import { AwsModule } from './aws/aws.module';
import {ConfigModule} from '@nestjs/config'


@Module({
  imports: [
    CategoriesModule, PlayersModule, 
    ProxyRMQModule, AwsModule,
    ConfigModule.forRoot({isGlobal: true})],
  controllers: [],
  providers: [],
})
export class AppModule {}
