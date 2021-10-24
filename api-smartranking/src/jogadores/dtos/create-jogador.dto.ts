import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateJogadorDto {
    @IsNotEmpty()
    readonly phoneNumber: string
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    readonly name: string
}