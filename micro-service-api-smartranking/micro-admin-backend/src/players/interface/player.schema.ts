import {Schema, Types} from 'mongoose'


export const PlayerSchema = new Schema({
    phoneNumber: {type: String},
    email: {type: String, unique: true},
    name: {type: String},
    category: {type: Types.ObjectId, ref: 'Category'},
    ranking: {type: String},
    rankingPosition: {type: Number},
    urlPhotoJogador: {type: String}
    
}, {timestamps: true, collection: 'players'})