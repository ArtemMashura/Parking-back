import { Request, Response } from "express";
import ParkingSpotService from "../services/parkingSpotService";

export const post = async (req: Request, res: Response) => {
    try {
        const { ...ParkingSpotData } = req.body;

        const createdParkingSpot: object = await ParkingSpotService.createParkingSpot({
            ...ParkingSpotData
        });

        res.status(200).json(
            createdParkingSpot,
        );
        
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}


export const getAll = async (req: Request, res: Response) => {
    try {
        const ParkingSpots: object[] | null = await ParkingSpotService.findAllParkingSpots();

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