import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/interfaces/players/player.interface';

@Injectable()
export class PlayersService {
  constructor(@InjectModel('Player')
  private readonly model: Model<Player>) { }

  logger = new Logger(PlayersService.name)

  async save(entity: Player): Promise<Player> {
    try {
      const player = new this.model(entity)
      return await player.save()
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async get(): Promise<Player[]> {
    try {
      return await this.model.find().exec()
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async getById(_id: string): Promise<Player> {
    try {
      return await this.model.findOne({_id}).exec()
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async update(_id: string, player: Player): Promise<void> {
    try {
      await this.getById(_id)
      await this.model.findOneAndUpdate({_id}, {$set: player}).exec()
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async delete(_id: string): Promise<void> {
    await this.getById(_id)

    await this.model.deleteOne({_id}).exec()
    
}

}
