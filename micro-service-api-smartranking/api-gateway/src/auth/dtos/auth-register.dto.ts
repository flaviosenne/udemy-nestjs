import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator"

export class AuthRegisterDto {
    @IsString()
    name: string
    @IsEmail()
    email: string
    // min 8 charactres - min 1 letter uprcase, min 1 letter lowecase, min 1 number
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'Senha inválida'})
    password: string
    @IsMobilePhone('pt-BR')
    phoneNumber: string
}