import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BandDataBase } from "../data/BandDataBase";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowDataBase } from "../data/ShowDataBase";
import { Show, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowController {

    async createShow(req: Request, res: Response){
        
        try{
            const weekDay = Show.toWeekDayEnum(req.body.weekDay as string) 
            const input: ShowInputDTO = {
                weekDay,
                bandId: req.body.bandId as string,
                startTime: Number(req.body.startTime as string),
                endTime: Number(req.body.endTime as string)
            }

            const showBusiness = new ShowBusiness(
                new ShowDataBase,
                new BandDataBase,
                new IdGenerator,
                new Authenticator
            )

            await showBusiness.createShow(input, req.headers.authorization as string)
            res.status(200)
        }

        catch(error){
            res.status(error.customErrorCode || 400).send({message: error.message})
        }

        finally { await BaseDatabase.destroyConnection() }

    }
}
