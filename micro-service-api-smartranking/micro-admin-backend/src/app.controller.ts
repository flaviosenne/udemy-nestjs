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
        const filterAckError = ackErrors.filter(
          ackError => e.message.includes(ackError))

        if(filterAckError){
          await channel.ack(originalMsg)
        }
      }

  }

  @MessagePattern('get-categories')
  async getCategories(
    @Payload() _id: string,
    @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()
    try{

      return _id 
      ? await this.appService.getCategoryById(_id)
      : await this.appService.getCategories()

    }catch(e){

      this.logger.error(`error: ${JSON.stringify(e.message)}`)

    }finally{

      await channel.ack(originalMessage)

    }

  }

  @EventPattern('update-category')
  async updateCategory(
    @Payload() data: any, 
    @Ctx() context: RmqContext){
      const channel = context.getChannelRef()
      const originalMessage = context.getChannelRef()

      this.logger.log(`data: ${JSON.stringify(data)}`)

      try{

        const _id: string = data.id
        const category: Category = data.category

        await this.appService.updateCategory(_id, category)
        await channel.ack(originalMessage)

      }catch(e){
        const filterAckError = ackErrors.filter(ack => e.message.includes(ack))

        if(filterAckError) await channel.ack(originalMessage)
      }

  }
}
