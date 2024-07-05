import { Prisma } from "@prisma/client"

export interface IParkingSpot {
    number: number
    floor: number
    pricePerHour: Prisma.Decimal
    parkingPlaceId: string

}

// export class PriceChecker {
//     gte: Prisma.Decimal

//     constructor(condition:string, price:Prisma.Decimal){
//         if (condition === "gte"){
//             this.gte = price
//         }
//         else {
//             this.lte: price
//         }
//     }
// }