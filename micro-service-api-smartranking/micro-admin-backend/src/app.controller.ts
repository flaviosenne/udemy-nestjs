import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, EventPattern, MessagePattern, Ctx, RmqContext}from '@nestjs/microservices'
import { Category } from './interfaces/categories/category.interface';

const ackErrors: string[] = ['E11000']

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name)

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: Category, 
    @Ctx() context: RmqContext){
      const channel = context.getChannelRef()
      const originalMsg = context.getMessage()

      this.logger.log(`category: ${JSON.stringify(category)}`)
      try{
        await this.appService.createCategory(category)
        await channel.ack(originalMsg)
      
      }catch(e){
        this.logger.error(`error: ${JSON.stringify(e.message)}`)
        ackErrors.map(async ackError => {
          if(e.message.includes(ackError)){
            await channel.ack(originalMsg)
          }
        })
      }

  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() _id: string){
    return _id 
    ? await this.appService.getCategoryById(_id)
    : await this.appService.getCategories()

  }
}
