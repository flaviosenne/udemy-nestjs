import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AwsCognitoService } from 'src/aws/aws-cognito.service';
import { JsonWebTokenService } from 'src/jwt/jwt.service';
import { ClientProxySmartRanking } from 'src/proxymq/client-proxy';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private proxy: ClientProxySmartRanking, 
        private awsCoginitoService: AwsCognitoService,
        private jwtService: JsonWebTokenService){}

    private readonly proxyAuth = this.proxy.getClientProxyAuthInstance()

    @Post('/register')
    @UsePipes(ValidationPipe)
    async register(@Body() dto: AuthRegisterDto){
        return await this.proxyAuth.send('register-user', dto).toPromise()
        // return await this.awsCoginitoService.registerUser(dto)
    }

    
    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() dto: AuthLoginDto){
        // return await this.awsCoginitoService.authenticateUser(dto)      
        const user = await this.proxyAuth.send('get-user-login', dto).toPromise()
        
        if(!user) throw new BadRequestException('Credênciais inválidas')

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
          }

        const token = this.jwtService.generateToken(payload)

        return { token }
        
    }

    
}
