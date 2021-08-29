import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDataBase } from "../data/BandDataBase";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandController{

    async registrerBand(req: Request, res: Response){
        try{

        const input: BandInputDTO = {
            name: req.body.name,
            mainGenre: req.body.mainGenre,
            responsible: req.body.responsible
        }
    
        const bandBusiness = new BandBusiness(
            new BandDataBase,
            new IdGenerator,
            new Authenticator
        )
        
        await bandBusiness.registerBand(input, req.headers.authorization as string)
        res.sendStatus(200)
        }

        catch(error){
            res.status(error.customErrorCode || 400).send({
                message: error.message 
            })
        }

        finally{
            await BaseDatabase.destroyConnection()
        }
    }

    async getBandDetail(req: Request, res: Response){
        
        try{
            const input = (req.query.id ?? req.query.name) as string

            const bandBusiness = new BandBusiness(
                new BandDataBase,
                new IdGenerator,
                new Authenticator
            )
            const band = await bandBusiness.getBandDetailByIdOrName(input)
            res.status(200).send(band)
        }

        catch(error){
            res.status(error.customErrorCode || 400).send({message: error.message})
        }

        finally { await BaseDatabase.destroyConnection() }
    }




}