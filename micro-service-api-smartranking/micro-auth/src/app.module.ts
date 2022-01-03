import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { UserSchema } from './interface/user.schema';

@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-players-ranking.ggar0.mongodb.net/sr-auth?retryWrites=true&w=majority',
    { useUnifiedTopology: true }),
    BcryptModule,
    MongooseModule
    .forFeature([
    {name: 'User', schema: UserSchema}]
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
