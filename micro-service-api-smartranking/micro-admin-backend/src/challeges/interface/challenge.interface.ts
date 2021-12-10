import { Document } from "mongoose";
import { Category } from "src/categories/interface/category.interface";
import { Player } from "src/players/interface/player.interface";
import { ChallengeStatus } from "./challenge-status.enum";

export interface Challenge extends Document {
    dateHourChallenge: Date
    dateHourRequest: Date
    dateHourResponse: Date
    requester: string
    players: Player[]
    category: Category
    match: Match
    status: ChallengeStatus
}

export interface Match extends Document {
    category: string
    players: Player[]
    def: Player
    result: Array<Result>
}

export interface Result {
    set: string
}