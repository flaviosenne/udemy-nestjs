import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { User } from './interface/user.interface';
import bcrypt from 'bcrypt'
import { passwordMatchers } from './helpers/bcrypt';
import { generateToken } from './helpers/jwt';

@Injectable()
export class AppService {

  constructor(@InjectModel('User') private readonly model: Model<User>) { }

  
  async register(dto: AuthRegisterDto) {

    const alreadyExistUser = await this.model.findOne({ email: dto.email }).exec()

    if (alreadyExistUser) throw new RpcException('Email já existe na base de dados')

    const user = new this.model(dto)

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(dto.password, salt)

    user.password = hash

    await user.save()
  }


  async login(dto: AuthLoginDto) {

    try {
      const existUser = await this.model.findOne({ email: dto.email }).exec()

      if (!existUser || !passwordMatchers(dto.password, existUser.password)) {
        return {error: 'Credenciais inválidas', result: null}
      }

      const payload = {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email
      }

      return { result: generateToken(payload), error: null }
    } catch (error) {
      throw new RpcException(error.message)
    }
  }
}
