import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) { }

  private readonly logger = new Logger(AppController.name)

  @EventPattern('register-user')
  async register(@Payload() dto: AuthRegisterDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      this.logger.log(`data: ${JSON.stringify(dto)}`)
      await this.service.register(dto)
      await channel.ack(originalMsg)
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
    }
  }

  @EventPattern('login')
  async login(@Payload() dto: AuthLoginDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try{
      this.logger.log(`data: ${JSON.stringify(dto)}`)
      const result = await this.service.login(dto)
      this.logger.log(`result: ${result}`)
      return result
    }
    catch(e){
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
    }
    finally{
      await channel.ack(originalMsg)
    }
      

  }
}
