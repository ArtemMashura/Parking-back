import { Request, Response } from "express";
import ParkingPlaceService from "../services/parkingPlaceService";
import { Prisma } from "@prisma/client";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...ParkingPlaceData } = req.body;

        const createdParkingPlace: object = await ParkingPlaceService.createParkingPlace({
            ...ParkingPlaceData
        });

        res.status(200).json(
            createdParkingPlace,
        );
        
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                res.status(409).json({
                    message: "A parking place with such coordinates already exists"
                })
            }
        }
        else {
            console.log(e)
            res.status(500).json({
                message: "Internal error",
            });
        }
        
    }
}


export const getAll = async (req: Request, res: Response) => {
    try {
        const result: object[] | null = await ParkingPlaceService.findAllParkingPlaces();

        res.status(200).json(
            result
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

        const result: object | null = await ParkingPlaceService.findParkingPlaceById(id);

        res.status(200).json(
            result
        );
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2025') {
                res.status(404).json({
                    message: "A parking place with such ID doesn't exist"
                })
            }
        }
        else {
            console.log(e)
            res.status(500).json({
                message: "Internal error",
            });
        }
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {...newData} = req.body;

        const result: object | null = await ParkingPlaceService.updateParkingPlace(id, newData);

        res.status(200).json({
            status: "succesfully updated",
            updatedParkingPlace: result
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                res.status(409).json({
                    message: "A parking place with such coordinates already exists"
                })
            }
            if (e.code === 'P2025') {
                res.status(404).json({
                    message: "A parking place with such ID doesn't exist"
                })
            }
        }
        else {
            console.log(e)
            res.status(500).json({
                message: "Internal error",
            });
        }
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: object | null = await ParkingPlaceService.removeParkingPlace(id);

        res.status(204).json({
            status: "succesfully deleted",
            deletedParkingPlace: result
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2025') {
                res.status(404).json({
                    message: "A parking place with such ID doesn't exist"
                })
            }
        }
        else {
            console.log(e)
            res.status(500).json({
                message: "Internal error",
            });
        }
    }
}