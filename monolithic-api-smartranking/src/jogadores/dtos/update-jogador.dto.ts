import { IsNotEmpty } from 'class-validator'

export class UpdateJogadorDto {
    @IsNotEmpty()
    readonly phoneNumber: string
    @IsNotEmpty()
    readonly name: string
}