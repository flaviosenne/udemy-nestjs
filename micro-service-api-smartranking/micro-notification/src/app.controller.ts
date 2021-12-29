import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Challenge } from './interface/challenge.interface';
import { ackErrors } from './utils/list-errors.util';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) { }

  private readonly logger = new Logger(AppController.name)

  @EventPattern('notification-new-challenge')
  async sendEmail(@Payload() data: Challenge, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      this.logger.log(`data: ${JSON.stringify(data)}`)
      this.service.sendEmail(data)
      await channel.ack(originalMsg)

    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      const filterAck = ackErrors.filter(ackError => error.message.includes(ackError))

      if (filterAck.length > 0) await channel.ack(originalMsg)
    }
  }
}
