import {Schema} from 'mongoose'


export const UserSchema = new Schema({
    phoneNumber: {type: String},
    email: {type: String, unique: true},
    name: {type: String},
    password: {type: String},
    urlPhoto: {type: String},
    isActive: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now()}
    
}, {timestamps: true, collection: 'users'})