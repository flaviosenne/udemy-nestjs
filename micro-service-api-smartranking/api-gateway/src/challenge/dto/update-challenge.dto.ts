import { ChallengeStatus } from "../enums/challenge-status.enum";

export interface UpdateChallengeDto {
    dateHourChallenge: Date
    status: ChallengeStatus
    dateHourRequest: Date
    dateHourResponse: Date
    category: string
    match: string
    players: string[]
}