import { IsArray, IsNotEmpty } from 'class-validator'
import { Result } from '../interfaces/challenge.interface'

export class MatchChallengeDto {
    @IsNotEmpty()
    def: string
    
    @IsArray()
    result: Result[]

}