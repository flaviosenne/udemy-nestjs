import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorySchema } from './interfaces/categories/category.schema';
import { PlayerSchema } from './interfaces/players/player.schema';

@Module({
  imports: [
    MongooseModule
    .forRoot('mongodb+srv://joao:joao@nestjs-jogadores-rankin.ggar0.mongodb.net/sr-admin-backend?retryWrites=true&w=majority',
    { useUnifiedTopology: true }),
    MongooseModule
    .forFeature([
      {name: 'Player', schema: PlayerSchema},
      {name: 'Category', schema: CategorySchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
