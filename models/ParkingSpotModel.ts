import { Prisma } from "@prisma/client"

export interface IParkingSpot {
    number: number
    floor: number
    pricePerHour: Prisma.Decimal
    parkingPlaceId: string

}

