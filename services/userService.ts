// import prisma from '../db/prisma';
// import { IUser } from "../models/UserModel";

// class UserService {
//     async createUser(userData: IUser): Promise<IUser> {
//         console.log(userData)    
//         return await prisma.user.create({data : userData});
//     }
//     async findAllUsers(): Promise<IUser[] | null> {
//         return await prisma.user.findMany({
//             include: {
//                 pendingOrders: true,
//                 cars: true
//             }
//         });
//     }
//     async findUserById(id: string): Promise<IUser | null> {
//         return await prisma.user.findFirst({where: {
//             id: id,
//         }});
//     }
//     async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
//         return await prisma.user.update({
//             where : {
//                 id: id
//             },
//             data: userData
//         })
//     }
//     async removeUser(id: string): Promise<object | null> {
//         const deleteOrders = prisma.orders.deleteMany({
//             where: {
//                 ownerId: id,
//             },
//         })

//         const deleteCars = prisma.cars.deleteMany({
//             where: {
//                 ownerId: id,
//             },
//         })
        
//         const deleteuser = prisma.user.delete({
//             where: {
//                 id: id,
//             },
//         })
        
//         return await prisma.$transaction([deleteOrders, deleteCars, deleteuser])

        
//     }
// }

// export default new UserService();