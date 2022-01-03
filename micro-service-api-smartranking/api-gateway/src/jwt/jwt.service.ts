import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService {

    constructor(private jwt: JwtService) { }

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

}
