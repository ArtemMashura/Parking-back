import { NextFunction, Request, Response } from "express";
import ParkingPlaceService from "../services/parkingPlaceService";
import { ParkingPlace, Prisma } from "@prisma/client";
import { ErrorCodes } from "../errorHandler/errorHandler";
import { IParkingPlace, IParkingPlaceFromReq, ParkingPlaceClass } from "../models/ParkingPlaceModel";

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...ParkingPlaceData } = req.body;

        const createdParkingPlace: object = await ParkingPlaceService.createParkingPlace({
            ...ParkingPlaceData
        });

        res.status(200).json({
            status: "succesfully created",
            result: createdParkingPlace,
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

        const filter:ParkingPlaceClass = new ParkingPlaceClass(params as any)
        
        console.log(filter, skip, take)
        const result: object[] | null = await ParkingPlaceService.findAllParkingPlaces(filter, skip, take);

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

export const getAllByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.query.name as string;
        const skip = parseInt(req.query.offset as string) || 0
        const take = parseInt(req.query.ammount as string) || 10

        const result: object[] | null = await ParkingPlaceService.findAllParkingPlacesByName(name, skip, take);

        res.status(200).json(
            result
        );

        // if (typeof skip === "number" && typeof take === "number") {
            
        // }
        // else {
        //     res.status(400).json("skip and take have to be whole numbers")
        // }
    } catch (error) {
        next(error)
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result: object | null = await ParkingPlaceService.findParkingPlaceById(id);

        if(!result){
            res.status(404).json({
                message: "A parking place with such ID doesn't exist"
            })
        }
        else {
            res.status(200).json(
                result
            );
        }
       
    } catch (error) {
        next(error)
    }
}

export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: object | null = await ParkingPlaceService.updateParkingPlace(id, newData);

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

        const result: object | null = await ParkingPlaceService.removeParkingPlace(id);

        res.status(204);
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