import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Category } from 'src/categories/interface/category.interface';
import { ackErrors } from 'src/utils/list-errors.util';
import { CategoriesService } from './categories.service';



@Controller()
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  logger = new Logger(CategoriesController.name)

  @EventPattern('create-category')
  async save(
    @Payload() category: Category, 
    @Ctx() context: RmqContext){
      const channel = context.getChannelRef()
      const originalMsg = context.getMessage()

      this.logger.log(`category: ${JSON.stringify(category)}`)
      try{
        await this.service.save(category)
        await channel.ack(originalMsg)
      
      }catch(e){
        this.logger.error(`error: ${JSON.stringify(e.message)}`)
        const filterAckError = ackErrors.filter(
          ackError => e.message.includes(ackError))

        if(filterAckError.length > 0) await channel.ack(originalMsg)
        
      }

  }

  @MessagePattern('get-categories')
  async get(
    @Payload() _id: string,
    @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()
    try{

      return _id 
      ? await this.service.getById(_id)
      : await this.service.get()

    }catch(e){

      this.logger.error(`error: ${JSON.stringify(e.message)}`)

    }finally{

      await channel.ack(originalMessage)

    }

  }

  @EventPattern('update-category')
  async update(
    @Payload() data: any, 
    @Ctx() context: RmqContext){
      const channel = context.getChannelRef()
      const originalMessage = context.getChannelRef()

      this.logger.log(`data: ${JSON.stringify(data)}`)

      try{

        const _id: string = data.id
        const category: Category = data.category

        await this.service.update(_id, category)
        await channel.ack(originalMessage)

      }catch(e){
        const filterAckError = ackErrors.filter(ack => e.message.includes(ack))
        
        if(filterAckError.length > 0) await channel.ack(originalMessage)
      }

  }
}
