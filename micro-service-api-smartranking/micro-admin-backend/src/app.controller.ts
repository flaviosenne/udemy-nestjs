import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, EventPattern}from '@nestjs/microservices'
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name)

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category){
    this.logger.log(`category: ${JSON.stringify(category)}`)
    this.appService.createCategory(category)
  }
}
