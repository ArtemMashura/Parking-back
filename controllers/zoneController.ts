import { NextFunction, Request, Response } from "express";
import ZoneService from "../services/zoneService";
import { Zone, Prisma } from "@prisma/client";
import { ErrorCodes } from "../errorHandler/errorHandler";

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...ZoneData } = req.body;

        const createdZone: object = await ZoneService.createZone({
            ...ZoneData
        });

        res.status(200).json({
            status: "succesfully created",
            result: createdZone,
        });
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === ErrorCodes.CONFLICT){
            res.status(409).json({
                message: "A parking place with such coordinates already exists",
                details: error.message
            })
        }
        else {
            next(error)
        }
    }
}


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {offset, ammount, ...params } = req.query;
        const skip = parseInt(req.query.offset as string) || 0
        const take = parseInt(req.query.ammount as string) || 10

        // const filter:ZoneFromReqClass = new ZoneFromReqClass(params as any)
        
        const result: object[] | null = await ZoneService.findAllZones(skip, take);

        res.status(200).json(
            result
        );
        // if (typeof skip === "number" && typeof take === "number") {
            
        // }
        // else {
        //     res.status(400).json("skip and take have to be whole numbers")
        // }
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError){
            res.status(400).json({
                message: "Bad Request",
                details: error.message
            })
        }
        else {
            next(error)
        }
    }
}


export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result: object | null = await ZoneService.findZoneById(id);

        if(!result){
            return res.status(404).json({
                message: "A parking place with such ID doesn't exist"
            })
        }
        res.status(200).json(
            result
        );
       
    } catch (error) {
        next(error)
    }
}

export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: object | null = await ZoneService.updateZone(id, newData);

        res.status(200).json({
            status: "succesfully updated",
            result: result
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === ErrorCodes.CONFLICT) {
                res.status(409).json({
                    message: "A parking place with such coordinates already exists",
                    details: error.message
                })
            }
            if (error.code === ErrorCodes.NOT_FOUND) {
                res.status(404).json({
                    message: "A parking place with such ID doesn't exist",
                    
                })
            }
        }
        else {
            next(error)
        }
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result: object | null = await ZoneService.removeZone(id);

        res.sendStatus(204);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && ErrorCodes.NOT_FOUND) {
            res.status(404).json({
                message: "A parking place with such ID doesn't exist"
            })
        }
        else {
            next(error)
        }
    }
}