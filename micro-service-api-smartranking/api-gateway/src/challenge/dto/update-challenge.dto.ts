import { IsOptional } from "class-validator";
import { ChallengeStatus } from "../enums/challenge-status.enum";

export class UpdateChallengeDto {
    @IsOptional()
    status: ChallengeStatus
    
}