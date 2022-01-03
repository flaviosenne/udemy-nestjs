import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenService } from './jwt.service';


@Module({
  imports: [JwtModule.register({
    secret: "secret-token-test",
    signOptions: { expiresIn: '1d' },
  }),],
  providers: [JsonWebTokenService],
  exports: [JsonWebTokenService]
})
export class JsonWebTokenModule {}
