import { Prisma } from "@prisma/client"

export interface IMapPoint {
    lat: Prisma.Decimal
    lng: Prisma.Decimal 
    zoneId: string
}
