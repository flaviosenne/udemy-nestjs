import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices'
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';
import { Player } from './interfaces/players/player.interface';


@Injectable()
export class AppService {

  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    @InjectModel('Player')
    private readonly playerModel: Model<Player>
  ) { }

  private readonly logger = new Logger(AppService.name)

  async createCategory(entity: Category): Promise<Category> {
    try {
      const categorySaved = new this.categoryModel(entity)
      return await categorySaved.save()

    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async getCategories(): Promise<Category[]>{

    try{

      return await this.categoryModel.find().exec()

    }catch(e){
      
      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async getCategoryById(_id: string): Promise<Category>{

    try{

      return await this.categoryModel.findOne({_id}).exec()

    }catch(e){

      this.logger.error(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async updateCategory(_id: string, dto: Category): Promise<void> {
    try{

      await this.categoryModel.findOneAndUpdate({_id}, {$set: dto}).exec()

    }catch(e){
      this.logger.log(`error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }

}

}