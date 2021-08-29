import { BandDataBase } from "../data/BandDataBase"
import { InvalidInputErro } from "../error/InvalidInput"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { Band, BandInputDTO } from "../model/Band"
import { UserRole } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class BandBusiness{
    constructor (
        private bandDataBase: BandDataBase,
        private idGeneretor: IdGenerator,
        private authenticator: Authenticator
    ){}

    async registerBand(input: BandInputDTO, token:string){
        const tokenData = this.authenticator.getData(token)
         
        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("Only admin can access this feature")
        }

        if(!input.name || !input.mainGenre || !input.responsible){
            throw new InvalidInputErro("Invalid input to registerBand")
        }

        await this.bandDataBase.createBand(
            Band.toBand({
                ...input,
                id: this.idGeneretor.generate()
            })!
        )

    }

    async getBandDetailByIdOrName(input: string): Promise<Band>{
            if(!input){
                throw new InvalidInputErro("Invalid input to getBandDetail")
            }
            return this.bandDataBase.getBandByIdOrNameOrFail(input)

    }
}



