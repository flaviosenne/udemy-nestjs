import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { ChallengeStatus } from "./challenge-status.enum";

export interface Challenge extends Document {
    dateHourChallenge: Date
    dateHourRequest: Date
    dateHourResponse: Date
    requester: string
    jogadores: Jogador[]
    category: string
    match: Match
    status: ChallengeStatus
}

export interface Match extends Document {
    category: string
    jogadores: Jogador[]
    def: Jogador
    result: Array<Result>
}

export interface Result {
    set: string
}