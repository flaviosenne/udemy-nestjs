import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AwsCognitoService } from 'src/aws/aws-cognito.service';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private proxy: ClientProxySmartRanking, 
        private awsCoginitoService: AwsCognitoService){}

    private readonly proxyAuth = this.proxy.getClientProxyAuthInstance()

    @Post('/register')
    @UsePipes(ValidationPipe)
    async register(@Body() dto: AuthRegisterDto){
        console.log('dto: ',dto)
        return await this.proxyAuth.emit('register-user', dto).toPromise()
        // return await this.awsCoginitoService.registerUser(dto)
    }

    
    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() dto: AuthLoginDto){
        return await this.proxyAuth.send('login', dto).toPromise()
        // return await this.awsCoginitoService.authenticateUser(dto)            
    }
}
