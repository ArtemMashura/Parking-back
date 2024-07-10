import prisma from '../db/prisma';
import { IMapPoint } from "../models/MapPointModel";

class MapPointService {
    async createMapPoint(MapPointData: IMapPoint): Promise<IMapPoint> {  
        return await prisma.mapPoint.create({data : MapPointData});
    }
    async createManyMapPoints(MapPointData: IMapPoint[]): Promise<IMapPoint[]> {  
        return await prisma.mapPoint.createManyAndReturn({
            data : MapPointData,
            skipDuplicates: true
        });
    }
    async findAllMapPoints(skip: number, take: number): Promise<IMapPoint[] | null> {
        return await prisma.mapPoint.findMany({
            skip,
            take
        });
        
    }
    async findMapPointById(id: string): Promise<IMapPoint | null> {
        return await prisma.mapPoint.findFirst({where: {
            id: id,
        }});
    }
    async updateMapPoint(id: string, MapPointData: Partial<IMapPoint>): Promise<IMapPoint | null> {
        return await prisma.mapPoint.update({
            where : {
                id: id
            },
            data: MapPointData
        })
    }
    async removeMapPoint(id: string): Promise<IMapPoint | null> {
        return await prisma.mapPoint.delete({
            where : {
                id: id
            }
        })
    }
}

export default new MapPointService();