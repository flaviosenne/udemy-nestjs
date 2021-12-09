import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpdatePlayerDto {    
    @IsNotEmpty()
    category?: string

    @IsOptional()
    urlPhoto?: string

}