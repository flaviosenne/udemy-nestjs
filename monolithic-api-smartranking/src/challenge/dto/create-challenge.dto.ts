import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from 'class-validator'
import { Jogador } from 'src/jogadores/interfaces/jogador.interface'

export class CreateChallengeDto {
    @IsNotEmpty()
    @IsDateString()
    dateHourChallenge: Date
    
    @IsNotEmpty()
    requester: string

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Jogador[]
}