import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy } from 'passport-local';

@Injectable()
export class JsonWebTokenService extends PassportStrategy(Strategy) {

    constructor(private jwt: JwtService) { 
        super(
            // {
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            // audience:  this.authConfig.clientId,
            // issuer: this.authConfig.authority,
            // algorithms: ['RS256'],
            // secretOrKeyProvider:  passportJwtSecret({
            //     cache: true,
            //     rateLimit: true,
            //     jwksRequestsPerMinute: 5,
            //     jwksUri: `${authConfig.authority}/well-known/jwks.json`
            // })
        // }
        )
    }

    generateToken = (payload: any): string => {

        return this.jwt.sign(payload)
    }

    tokenValid = async (token: string): Promise<any | boolean> => {
        try {
            return await this.jwt.verify(token)

        } catch (err) {
            return false
        }
    }

    decodeToken = async (token: string): Promise<any | null> => {
        try {
            return await this.jwt.verify(token)
        } catch (err) {
            return null
        }
    }

    public async validate(payload: any) {
        const valid = this.tokenValid(payload)

        console.log('chegou ',this.tokenValid(payload))
        if (!valid) throw new UnauthorizedException();
        
        return payload;
    }
 

}
