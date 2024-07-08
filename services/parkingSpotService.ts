import { Prisma } from '@prisma/client';
import prisma from '../db/prisma';
import { IParkingSpot, ParkingSpotFromReqClass } from "../models/ParkingSpotModel";

class ParkingSpotService {
    async createParkingSpot(ParkingSpotData: IParkingSpot): Promise<IParkingSpot> {        
        return await prisma.parkingSpot.create({data : ParkingSpotData});
    }
    async findAllParkingSpots(filter: ParkingSpotFromReqClass, skip: number, take: number): Promise<IParkingSpot[] | null> {
        return await prisma.parkingSpot.findMany({
            include: {
                pendingOrders: true
            },
            where: filter,
            skip,
            take
        });
    }
    async findParkingSpotsByPrice(filter: object, skip: number, take: number): Promise<IParkingSpot[] | null> {
        return await prisma.parkingSpot.findMany({
            where: {
                pricePerHour: filter
            },
            include: {
                pendingOrders: true
            },
            skip,
            take
        });
    }
    async findParkingSpotById(id: string): Promise<IParkingSpot | null> {
        return await prisma.parkingSpot.findUnique({
            where: {
                id: id,
            },
            include: {
                pendingOrders: true
            }
        });
    }
    async updateParkingSpot(id: string, ParkingSpotData: Partial<IParkingSpot>): Promise<IParkingSpot | null> {
        return await prisma.parkingSpot.update({
            where : {
                id: id
            },
            data: ParkingSpotData
        })
    }
    async removeParkingSpot(id: string): Promise<object | null> {
        return await prisma.parkingSpot.delete({
            where: {
                id: id,
            },
        })
        // const deleteOrders = prisma.orders.deleteMany({
        //     where: {
        //         parkingSpotId: id,
        //     },
        // })
        
        // const deleteParkingSpot = prisma.parkingSpot.delete({
        //     where: {
        //         id: id,
        //     },
        // })
        
        // return await prisma.$transaction([deleteOrders, deleteParkingSpot])

        
    }
}

export default new ParkingSpotService();