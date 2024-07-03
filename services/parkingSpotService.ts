import prisma from '../db/prisma';
import { IParkingSpot } from "../models/ParkingSpotModel";

class ParkingSpotService {
    async createParkingSpot(ParkingSpotData: IParkingSpot): Promise<IParkingSpot> {        
        return await prisma.parkingSpot.create({data : ParkingSpotData});
    }
    async findAllParkingSpots(): Promise<IParkingSpot[] | null> {
        return await prisma.parkingSpot.findMany({
            include: {
                pendingOrders: true
            }
        });
    }
    async findParkingSpotById(id: string): Promise<IParkingSpot | null> {
        return await prisma.parkingSpot.findUnique({where: {
            id: id,
        }});
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
        const deleteOrders = prisma.orders.deleteMany({
            where: {
                parkingSpotId: id,
            },
        })
        
        const deleteParkingSpot = prisma.parkingSpot.delete({
            where: {
                id: id,
            },
        })
        
        return await prisma.$transaction([deleteOrders, deleteParkingSpot])

        
    }
}

export default new ParkingSpotService();