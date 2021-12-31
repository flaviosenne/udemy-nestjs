import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private proxy: ClientProxySmartRanking){}

    private readonly proxyAuth = this.proxy.getClientProxyAuthInstance()

    @Post('/register')
    async register(@Body() dto: AuthRegisterDto){
        console.log('dto: ',dto)
        await this.proxyAuth.emit('register-user', dto).toPromise()
    }

    
    @Post('/login')
    async login(@Body() dto: AuthLoginDto){
        console.log('dto: ',dto)
        await this.proxyAuth.emit('login', dto).toPromise()
    }
}
