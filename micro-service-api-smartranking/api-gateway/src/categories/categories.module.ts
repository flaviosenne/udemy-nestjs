import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxymq/proxymq.module';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
