import { Injectable } from "@nestjs/common";
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {

    constructor(){}

    passwordMatchers = (password: string, hash: string): boolean => {
        return bcrypt.compareSync(password, hash)
    }

    encodePassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 12)
    }

}