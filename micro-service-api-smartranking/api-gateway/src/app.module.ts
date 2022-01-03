import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { ProxyRMQModule } from './proxymq/proxymq.module';
import { AwsModule } from './aws/aws.module';
import {ConfigModule} from '@nestjs/config'
import { ChallengeModule } from './challenge/challenge.module';
import { RankingsModule } from './rankings/rankings.module';
import { AuthModule } from './auth/auth.module';
import { JsonWebTokenModule } from './jwt/jwt.module';


@Module({
  imports: [
    CategoriesModule, PlayersModule, 
    ProxyRMQModule, AwsModule,
    JsonWebTokenModule,
    ConfigModule.forRoot({isGlobal: true}),
    ChallengeModule,
    RankingsModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
