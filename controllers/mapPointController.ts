import { NextFunction, Request, Response } from "express";
import MapPointService from "../services/mapPointService";
import { MapPoint, Prisma } from "@prisma/client";
import { ErrorCodes } from "../errorHandler/errorHandler";
import { IMapPoint } from "../models/MapPointModel";

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(1)
        const { ...MapPointData } = req.body;

        const createdMapPoint: object = await MapPointService.createMapPoint({
            ...MapPointData
        });

        res.status(200).json({
            status: "succesfully created",
            result: createdMapPoint,
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

export const postMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {zoneId, path } = req.body;

        var MapPoints:IMapPoint[] = []
        path.forEach((mapPoint: IMapPoint) => {
            MapPoints.push({
                "lat": mapPoint.lat,
                "lng": mapPoint.lng,
                "zoneId": zoneId
            })
        });
        console.log(MapPoints)
        const createdMapPoint: object = await MapPointService.createManyMapPoints(MapPoints);

        res.status(200).json({
            status: "succesfully created",
            result: createdMapPoint,
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

        // const filter:MapPointFromReqClass = new MapPointFromReqClass(params as any)
        
        const result: object[] | null = await MapPointService.findAllMapPoints(skip, take);

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

        const result: object | null = await MapPointService.findMapPointById(id);

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

        const result: object | null = await MapPointService.updateMapPoint(id, newData);

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

        const result: object | null = await MapPointService.removeMapPoint(id);

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