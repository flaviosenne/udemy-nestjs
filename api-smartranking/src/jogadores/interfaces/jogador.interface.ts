import { Document} from 'mongoose'

export interface Jogador extends Document {
    readonly phoneNumber: string
    readonly email: string
    name: string
    ranking: string
    rankingPosition: number
    urlPhotoJogador: string
    
}