import { Document } from 'mongoose'


export interface Category extends Document {

    readonly category: string
    description: string
    events: Array<Events>
}

export interface Events {
    name: string
    operation: string
    value: number
}