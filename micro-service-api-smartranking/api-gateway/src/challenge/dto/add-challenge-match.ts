import { IsNotEmpty } from "class-validator";

export class AddChallengeMatchDto{
    @IsNotEmpty()
    def: {_id: string}

    @IsNotEmpty()
    result: {set:string}[]
}