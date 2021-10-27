import { Schema, Types } from "mongoose";

export const MatchSchema = new Schema({
    category: {type: String},
    jogadores: [
        { type: Types.ObjectId, ref: 'Jogador'}
    ],
    def: { type: Types.ObjectId, ref: 'Jogador' },
    resultado: [ 
        { set: {type: String} } 
    ]
}, {timestamps: true, collection: 'matches'})