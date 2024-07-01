// import prisma from '../db/prisma';
// import { ICar } from "../models/CarModel";

// class CarService {
//     async createCar(carsData: ICar): Promise<ICar> {  
//         return await prisma.cars.create({data : carsData});
//     }
//     async findAllCars(): Promise<ICar[] | null> {
//         return await prisma.cars.findMany();
//     }
//     async findCarById(id: string): Promise<ICar | null> {
//         return await prisma.cars.findFirst({where: {
//             id: id,
//         }});
//     }
//     async updateCar(id: string, carsData: Partial<ICar>): Promise<ICar | null> {
//         return await prisma.cars.update({
//             where : {
//                 id: id
//             },
//             data: carsData
//         })
//     }
//     async removeCar(id: string): Promise<ICar | null> {
//         return await prisma.cars.delete({
//             where : {
//                 id: id
//             }
//         })
//     }
// }

// export default new CarService();