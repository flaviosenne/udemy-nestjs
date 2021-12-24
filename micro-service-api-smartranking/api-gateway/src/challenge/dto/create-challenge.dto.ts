import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator"

export class CreateChallengeDto {
    @IsNotEmpty()
    @IsDateString()
    dateHourChallenge: Date

    @IsNotEmpty()
    requester: string
    
    @IsNotEmpty()
    category: string
    
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: {_id:string}[]
}
