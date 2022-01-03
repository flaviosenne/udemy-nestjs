import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

const ackErrors: string[] = ['E1100']

@Controller()
export class AppController {

  constructor(private readonly service: AppService) { }

  private readonly logger = new Logger(AppController.name)

  @EventPattern('register-user')
  async register(@Payload() dto: AuthRegisterDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      await this.service.register(dto)
      await channel.ack(originalMsg)
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      
      const ackFilter = ackErrors.filter(ack => error.message.includes(ack))

      if(ackFilter.length > 0) await channel.ack(originalMsg) 

    }
  }

  @MessagePattern('get-user-login')
  async login(@Payload() dto: AuthLoginDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try{
      this.logger.log(`data: ${JSON.stringify(dto)}`)
      return await this.service.getUserLogin(dto)
    }
    catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)

      const ackFilter = ackErrors.filter(ack => error.message.includes(ack))

      if(ackFilter.length > 0) await channel.ack(originalMsg) 

    }
    finally{
      await channel.ack(originalMsg)
    }
      

  }
}
