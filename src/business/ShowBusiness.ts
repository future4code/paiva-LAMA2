import { BandDataBase } from "../data/BandDataBase";
import { ShowDataBase } from "../data/ShowDataBase";
import { InvalidInputErro } from "../error/InvalidInput";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Show, ShowInputDTO } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
    constructor(
        private showDataBase: ShowDataBase,
        private bandDataBase: BandDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async createShow(input: ShowInputDTO, token: string){

        const tokenData = this.authenticator.getData(token)
        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("Only admins can access this feature")
        }
        console.log(input)
        if(!input.bandId || !input.weekDay || !input.startTime || !input.endTime ){
            throw new InvalidInputErro("Invalid input to createShow")
        }

        if(input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime){
            throw new InvalidInputErro("Invalid time to createShow")
        }

        if(!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)){
            throw new InvalidInputErro("Times should be integer to createShow")
        }

        const band = await this.bandDataBase.getBandByIdOrNameOrFail(input.bandId)

        if(!band){
            throw new NotFoundError("Band not found")
        }

        const registeredShows = await this.showDataBase.getShowsByTimes(input.weekDay, input.startTime, input.endTime)

        if(registeredShows.length){
            throw new InvalidInputErro("No more show can be registered at this times")
        }

        await this.showDataBase.createShow(
            Show.toShow({
                ...input,
                id: this.idGenerator.generate(),
            })
        )
    }
}