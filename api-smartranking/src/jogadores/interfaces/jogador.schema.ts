import {Schema} from 'mongoose'


export const JogadorSchema = new Schema({
    phoneNumber: {type: String, unique: true},
    email: {type: String, unique: true},
    name: {type: String},
    ranking: {type: String},
    rankingPosition: {type: Number},
    urlPhotoJogador: {type: String}
    
}, {timestamps: true, collection: 'jogadores'})