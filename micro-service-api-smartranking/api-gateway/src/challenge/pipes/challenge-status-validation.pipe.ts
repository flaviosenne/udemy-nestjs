import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { ChallengeStatus } from "../enums/challenge-status.enum";

export class ChallengeStatusValidationPipe implements PipeTransform {

    readonly permittedStatus = [
        ChallengeStatus.ACCEPT,
        ChallengeStatus.DENIED,
        ChallengeStatus.CANCELED
    ]

    transform(value: any) {
        const status = value.status.toUpperCase()

        if(!this.isValidStatus(status)) throw new BadRequestException(`${status} é um status inválido`)

        return value
    }

    private isValidStatus(status: any): boolean{
        return this.permittedStatus.indexOf(status) !== -1
    }

}