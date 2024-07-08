import { Prisma } from "@prisma/client"
import { IOrders } from "./OrdersModel"

export interface IParkingSpot {
    number: number
    floor: number
    pricePerHour: Prisma.Decimal
    parkingPlaceId: string
}

export interface IParkingSpotFromReq {
    number:  string
    floor: string
    pricePerHour: string
    parkingPlaceId: string
}

export class ParkingSpotFromReqClass {
    number!: number
    floor!: number
    pricePerHour!: Prisma.Decimal
    parkingPlaceId!: string
    
    constructor(data:IParkingSpotFromReq){
        if (data.number)
            this.number = parseInt(data.number)
        if (data.floor)
            this.floor = parseInt(data.floor)
        if (data.pricePerHour)
            this.pricePerHour = new Prisma.Decimal(parseFloat(data.pricePerHour))
        if (data.parkingPlaceId)
            this.parkingPlaceId = data.parkingPlaceId
    }
}
