import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encodePassword, passwordMatchers } from './bcrypt/bcrypt.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { User } from './interface/user.interface';

@Injectable()
export class AppService {

  constructor(@InjectModel('User') private readonly model: Model<User>) { }


  async register(dto: AuthRegisterDto) {

    const alreadyExistUser = await this.model.findOne({ email: dto.email }).exec()

    if (alreadyExistUser) throw new RpcException('Email já existe na base de dados')

    const user = new this.model(dto)

    const hash = await encodePassword(dto.password)

    user.password = hash

    await user.save()
  }


  async getUserLogin(dto: AuthLoginDto) {

    try {
      const existUser = await this.model.findOne({ email: dto.email, isActive: 1 }).exec()

      if (!existUser || !passwordMatchers(dto.password, existUser.password)) {
        return null
      }

      return existUser

    } catch (error) {
      return null
    }
  }
}
