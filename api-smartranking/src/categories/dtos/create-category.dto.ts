import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Events } from "../interfaces/categories.interface";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly category: string
    
    @IsString()
    @IsNotEmpty()
    description: string

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Events>
}