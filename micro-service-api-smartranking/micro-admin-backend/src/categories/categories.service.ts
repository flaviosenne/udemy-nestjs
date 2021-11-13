import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/interfaces/categories/category.interface';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category')
        private readonly model: Model<Category>
      ) { }
    
      private readonly logger = new Logger(CategoriesService.name)
    
      async save(entity: Category): Promise<Category> {
        try {
          const categorySaved = new this.model(entity)
          return await categorySaved.save()
    
        } catch (e) {
          this.logger.error(`error: ${JSON.stringify(e.message)}`)
          throw new RpcException(e.message)
        }
      }
    
      async get(): Promise<Category[]>{
    
        try{
    
          return await this.model.find().exec()
    
        }catch(e){
          
          this.logger.error(`error: ${JSON.stringify(e.message)}`)
          throw new RpcException(e.message)
        }
      }
    
      async getById(_id: string): Promise<Category>{
    
        try{
    
          return await this.model.findOne({_id}).exec()
    
        }catch(e){
    
          this.logger.error(`error: ${JSON.stringify(e.message)}`)
          throw new RpcException(e.message)
        }
      }
    
      async update(_id: string, dto: Category): Promise<void> {
        try{
    
          await this.model.findOneAndUpdate({_id}, {$set: dto}).exec()
    
        }catch(e){
          this.logger.log(`error: ${JSON.stringify(e.message)}`)
          throw new RpcException(e.message)
        }
    
    }
}
