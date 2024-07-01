import { Prisma } from "@prisma/client"

// export interface IOrders {
//     takenFrom: Date
//     takenUntil: Date
//     parkingSpotId: string
//     pricePerHour: Prisma.Decimal
//     durationInHours: number
//     finalPrice: Prisma.Decimal
//     ownerId: string
//     parkedCarId: string
// }

export interface IOrders {
    takenFrom: Date
    takenUntil: Date
    parkingSpotId: string
    pricePerHour: Prisma.Decimal
    durationInHours: number
    finalPrice: Prisma.Decimal
    parkedCarSign: string
}