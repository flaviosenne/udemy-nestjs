import * as bcrypt from 'bcrypt'


export const passwordMatchers = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash)
}

export const encodePassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12)
}
