import { Document} from 'mongoose'
import { Category } from '../../categories/interface/category.interface';

export interface Player extends Document {
    readonly phoneNumber: string
    readonly email: string
    category: Category
    name: string
    ranking: string
    rankingPosition: number
    urlPhotoJogador: string
    
}