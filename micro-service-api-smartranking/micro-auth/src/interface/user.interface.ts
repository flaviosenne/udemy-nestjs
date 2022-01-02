import { Document} from 'mongoose'

export interface User extends Document {
    readonly phoneNumber: string
    readonly email: string
    name: string
    password: string
    urlPhoto: string
    
}