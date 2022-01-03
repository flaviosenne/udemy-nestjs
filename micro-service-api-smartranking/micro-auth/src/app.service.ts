import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from './bcrypt/bcrypt.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { User } from './interface/user.interface';

@Injectable()
export class AppService {

  constructor(@InjectModel('User') private readonly model: Model<User>,
  private bcrypt: BcryptService) { }

  
  async register(dto: AuthRegisterDto) {

    const alreadyExistUser = await this.model.findOne({ email: dto.email }).exec()

    if (alreadyExistUser) throw new RpcException('Email já existe na base de dados')

    const user = new this.model(dto)

    const hash = await this.bcrypt.encodePassword(dto.password)

    console.log('hash: ', hash)
    user.password = hash

    await user.save()
  }


  async getUserLogin(dto: AuthLoginDto) {

    try {
      const existUser = await this.model.findOne({ email: dto.email }).exec()

      if (!existUser || !this.bcrypt.passwordMatchers(dto.password, existUser.password)) {
        return {error: 'Credenciais inválidas', result: null}
      }

      } catch (error) {
      throw new RpcException(error.message)
    }
  }
}
