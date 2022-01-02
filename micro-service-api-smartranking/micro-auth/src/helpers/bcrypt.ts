   
import bcrypt from 'bcrypt'

export const passwordMatchers = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash)    
}