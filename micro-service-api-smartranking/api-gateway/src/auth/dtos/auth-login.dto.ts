import { IsEmail, Matches } from "class-validator"

export class AuthLoginDto {
    @IsEmail()
    email: string
    // min 8 charactres - min 1 letter uprcase, min 1 letter lowecase, min 1 number
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'Senha inválida'})
    password: string
    
}