const jwt = require('jsonwebtoken');
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { IParkingLot } from "../models/ParkingLotModel";

class GroupService {
    async createGroup(studentData: IParkingLot): Promise<IGroupModel> {        
        // return await prisma.parkingLot.create({data : { name: "123", coordX: 123, coordY: 123 }});
        return await prisma.parkingLot.create({data : ...studentData});
    }
    // async findAllGroups(): Promise<IGroupModel[] | null> {
    //     return await GroupModel.find();
    // }
    // async findGroupById(id: string): Promise<IGroupModel | null> {
    //     return await GroupModel.findById(id);
    // }
    // async updateGroup(id: string, userData: Partial<IGroup>): Promise<IGroupModel | null> {
    //     return await GroupModel.findByIdAndUpdate({_id: id}, userData, {
    //         new: true
    //     });
    // }
    // async removeGroup(id: string): Promise<IGroupModel | null> {   // тут должен быть каскад еще 2 таблиц
    //     await StudentGroupModel.deleteMany({groupID: id})
    //     await GroupDisciplineModel.deleteMany({groupID: id})

    //     return await GroupModel.findByIdAndDelete(id);
    // }
}

export default new GroupService();