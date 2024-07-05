import { NextFunction, Request, Response } from "express";
import ParkingSpotService from "../services/parkingSpotService";
import { Prisma } from "@prisma/client";
import { ErrorCodes } from "../errorHandler/errorHandler";
import { IParkingSpot } from "../models/ParkingSpotModel";
import { Decimal } from "@prisma/client/runtime/library";

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...ParkingSpotData } = req.body;

        const createdParkingSpot: object = await ParkingSpotService.createParkingSpot({
            ...ParkingSpotData
        });

        res.status(200).json({
            status: "succesfully created",
            result: createdParkingSpot,
        });
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === ErrorCodes.CONFLICT){
            res.status(409).json({
                message: "A parking spot with with such number and floor already exists in that parking place"
            })
        }
        else {
            next(error)
        }
    }
}


export const getAll = async (req: Request, res: Response) => {
    try {
        const {offset, ammount, ...params } = req.query;
        const skip = parseInt(req.query.offset as string) || 0
        const take = parseInt(req.query.ammount as string) || 10

        var filter:Partial<IParkingSpot> = {}
        if (params.number){
            filter.number = parseInt(params.coordX as string)
        }
        if (params.floor){
            filter.floor = parseInt(params.coordY as string)
        }
        if (params.pricePerHour){
            filter.pricePerHour = new Decimal(params.coordY as string)
        }
        console.log(skip, take)
        const ParkingSpots: object[] | null = await ParkingSpotService.findAllParkingSpots(filter, skip, take);

        res.status(200).json(
            ParkingSpots
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getByPrice = async (req: Request, res: Response) => {
    try {
        const { condition, price } = req.query;
        var filter:object
        if (condition === "gte"){
            filter = {
                gte: price
            }   
        }
        else if (condition === "lte"){
            filter = {
                lte: price
            }   
        }
        else {
            return res.status(400).json({
                message: "Error while finding the condition",
            })
            
        }
        
        const ParkingSpots: object[] | null = await ParkingSpotService.findParkingSpotsByPrice(filter);

        res.status(200).json(
            ParkingSpots
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: object | null = await ParkingSpotService.findParkingSpotById(id);

        if (!result)
            return res.status(404).json({message: "Parking place not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: object | null = await ParkingSpotService.updateParkingSpot(id, newData);

        if (!result)
            return res.status(404).json({message: "Parking place not found"});

        res.status(200).json(
            result,
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: object | null = await ParkingSpotService.removeParkingSpot(id);

        if (!result)
            return res.status(404).json({message: "Parking place not found"});
        
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}