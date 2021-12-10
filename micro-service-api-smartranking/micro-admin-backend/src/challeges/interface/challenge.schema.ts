import { Schema, Types } from "mongoose";

export const ChallengeSchema = new Schema({
    dateHourChallenge: {type: Date},
    status: {type: String},
    dateHourRequest: {type: Date},
    dateHourResponse: {type: Date},
    requester: {type: Types.ObjectId, ref: "Player"},
    category: {type: String},
    players: [
        {type: Types.ObjectId, ref: 'Player'}
    ],
    match: {type: Types.ObjectId, ref: 'Match'}
    
}, {timestamps: true, collection: 'challenges'})