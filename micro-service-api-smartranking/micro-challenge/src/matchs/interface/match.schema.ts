import { Schema, Types } from "mongoose";

export const MatchSchema = new Schema({
    category: {type:Types.ObjectId, ref: 'Category' },
    challenge: {type:Types.ObjectId, ref: 'Challenge' },
    jogadores: [
        { type: Types.ObjectId, ref: 'Player'}
    ],
    def: { type: Types.ObjectId, ref: 'Player' },
    result: [ 
        { set: {type: String} } 
    ]
}, {timestamps: true, collection: 'matches'})