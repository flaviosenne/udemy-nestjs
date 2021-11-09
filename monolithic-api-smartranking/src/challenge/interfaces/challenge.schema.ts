import {Schema, Types} from 'mongoose'


export const ChallengeSchema = new Schema({
    dateHourChallenge: {type: Date},
    dateHourRequest: {type: Date},
    dateHourResponse: {type: Date},
    requester: {type: Types.ObjectId, ref: "Jogador"},
    status: {type: String},
    category: {type: String},
    jogadores: [
        {type: Types.ObjectId, ref: 'Jogador'}
    ],
    match: {type: Types.ObjectId, ref: 'Match'}
    
}, {timestamps: true, collection: 'challenges'})