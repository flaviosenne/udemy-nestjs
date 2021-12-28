export interface RankingResponse {
    player?:string
    position?:number
    points?: number
    matchHistory?: History 
}

export interface History {
    victory?: number
    defeat?: number 
}