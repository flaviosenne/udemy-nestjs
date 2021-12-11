export interface CreateChallengeDto {
    dateHourChallenge: Date
    requester: string
    category: string
    match: string
    players: {_id:string}[]
}
