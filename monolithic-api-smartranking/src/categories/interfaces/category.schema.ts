import { Schema, Types } from "mongoose"

export const CategorySchema = new Schema({
    category: {type: String, unique: true},
    description: {type: String},
    events: [
        {
            name: {type: String},
            operation: {type: String},
            value: {type: Number}
        }
    ],
    jogadores: [
        {type: Types.ObjectId, ref: 'Jogador'}
    ]

}, {timestamps: true, collection: 'categories'})