import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-jogadores-rankin.ggar0.mongodb.net/smartranking?retryWrites=true&w=majority',
    {useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true, useFindAndModift: false}
    ),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
