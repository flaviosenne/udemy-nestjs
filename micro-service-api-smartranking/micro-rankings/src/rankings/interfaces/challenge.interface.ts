import { ChallengeStatus } from "./challenge-status.enum";

export interface Challenge{
    _id: string
    dateHourChallenge: Date
    status: ChallengeStatus
    dateHourRequest: Date
    dateHourResponse?: Date
    requester: string
    category: string
    match?:string
    players: string[]
}