import prisma from '../db/prisma';
import { IZone } from "../models/ZoneModel";

class ZoneService {
    async createZone(zoneData: IZone): Promise<IZone> {  
        return await prisma.zone.create({data : zoneData});
    }
    async findAllZones(skip: number, take: number): Promise<IZone[] | null> {
        return await prisma.zone.findMany({
            include: {
                path: true
            },
            skip,
            take
        });
        
    }
    async findZoneById(id: string): Promise<IZone | null> {
        return await prisma.zone.findFirst({where: {
            id: id,
        }});
    }
    async updateZone(id: string, zoneData: Partial<IZone>): Promise<IZone | null> {
        return await prisma.zone.update({
            where : {
                id: id
            },
            data: zoneData
        })
    }
    async removeZone(id: string): Promise<IZone | null> {
        return await prisma.zone.delete({
            where : {
                id: id
            }
        })
    }
}

export default new ZoneService();