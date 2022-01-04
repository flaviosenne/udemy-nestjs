import { Injectable } from "@nestjs/common";
import { AuthRegisterDto } from '../auth/dtos/auth-register.dto'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { AwsCognitoConfig } from "./config/aws-cognito.config";
import { AuthLoginDto } from "src/auth/dtos/auth-login.dto";

@Injectable()
export class AwsCognitoService {

    constructor(private authConfig: AwsCognitoConfig) {

        // this.userPool = new CognitoUserPool({
        //     UserPoolId: this.authConfig.userPoolId,
        //     ClientId: this.authConfig.clientId
        // })

    }

    private userPool: CognitoUserPool

    async registerUser(dto: AuthRegisterDto) {
        const { name, email, password, phoneNumber } = dto

        // return new Promise((resolve, reject) => {
        //     this.userPool.signUp(
        //         email,
        //         password,
        //         [
        //             new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber }),
        //             new CognitoUserAttribute({ Name: 'name', Value: name }),
        //         ],
        //         null,
        //         (error, result) => {
        //             if (!result) {
        //                 reject(error)
        //             } else {
        //                 resolve(result.user)
        //             }
        //         }
        //     )
        // })
    }

    async authenticateUser(dto: AuthLoginDto){
        const {password, email} = dto

        // const userData = {
        //     Username: email,
        //     Pool: this.userPool
        // }

        // const authenticationDetails = new AuthenticationDetails({
        //     Username: email,
        //     Password: password
        // })

        // const userCognito = new CognitoUser(userData)

        // return new Promise((resolve, reject)=> {
        //     userCognito.authenticateUser(authenticationDetails, {
        //         onSuccess: result => resolve(result),
        //         onFailure: error => reject(error)
        //     })

        // })
    }
}