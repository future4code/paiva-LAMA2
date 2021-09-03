import { BaseError } from "./BaseError"

export class InvalidInputErro extends BaseError{
    constructor (message: string){
        super(message, 417)
    }
}