import { Document } from "mongoose";
import { ChallengeStatus } from "./challenge-status.enum";

export interface Challenge extends Document {
    dateHourChallenge: Date
    dateHourRequest: Date
    dateHourResponse: Date
    requester: string
    players: string[]
    category: string
    match?: string
    status: ChallengeStatus
}
