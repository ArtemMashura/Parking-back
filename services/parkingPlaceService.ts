import prisma from '../db/prisma';
import { IParkingPlace, ParkingPlaceFromReqClass } from "../models/ParkingPlaceModel";

class ParkingPlaceService {
    async createParkingPlace(ParkingPlaceData: IParkingPlace): Promise<object> {        
        return await prisma.parkingPlace.create({data : ParkingPlaceData});
    }
    async findAllParkingPlaces(filter: ParkingPlaceFromReqClass, skip: number, take: number): Promise<object[] | null> {
        return await prisma.parkingPlace.findMany({
            include: {
                parkingspots: true
            },
            where: filter,
            skip,
            take
        });
    }
    async findAllParkingPlacesByName(filter: string, skip: number, take: number): Promise<object[] | null> {
        return await prisma.parkingPlace.findMany({
            include: {
                parkingspots: true
            },
            where: {
                name: {
                    startsWith: filter
                }
            },
            skip,
            take
        });
    }
    async findParkingPlaceById(id: string): Promise<object | null> {
        return await prisma.parkingPlace.findUnique({
            where: {
                id: id,
            },
            include: {
                parkingspots: true
            }
        });
    }
    async updateParkingPlace(id: string, ParkingPlaceData: Partial<IParkingPlace>): Promise<object | null> {
        return await prisma.parkingPlace.update({
            where : {
                id: id
            },
            data: ParkingPlaceData
        })
    }
    async removeParkingPlace(id: string): Promise<object | null> {
        return await prisma.parkingPlace.delete({
            where: {
                id: id,
            },
        })
        // const deleteParkingSpots = prisma.parkingSpot.deleteMany({
        //     where: {
        //         parkingPlaceId: id,
        //     },
        // })
        
        // const deleteParkingPlace = prisma.parkingPlace.delete({
        //     where: {
        //         id: id,
        //     },
        // })
        
        // return await prisma.$transaction([deleteParkingSpots, deleteParkingPlace])
        
    }
}

export default new ParkingPlaceService();