import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, EventPattern, MessagePattern}from '@nestjs/microservices'
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name)

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category){
    this.logger.log(`category: ${JSON.stringify(category)}`)
    await this.appService.createCategory(category)
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() _id: string){
    return _id 
    ? await this.appService.getCategoryById(_id)
    : await this.appService.getCategories()

  }
}
