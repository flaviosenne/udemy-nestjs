import * as mongoose from 'mongoose'

export class Ranking extends mongoose.Document {
    challenge: string
    player: string
    match: string
    category: string
    event: string
    operation: string
    points: string
}