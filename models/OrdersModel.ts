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

export interface IOrdersFromReq {
    takenFrom: string
    takenUntil: string
    parkingSpotId: string
    pricePerHour: string
    durationInHours: string
    finalPrice: string
    parkedCarSign: string
}

export class OrdersFromReqClass {
    takenFrom!: Date
    takenUntil!: Date
    parkingSpotId!: string
    pricePerHour!: Prisma.Decimal
    durationInHours!: number
    finalPrice!: Prisma.Decimal
    parkedCarSign!: string
    
    constructor(data:IOrdersFromReq){
        if (data.takenFrom)
            this.takenFrom = new Date(data.takenFrom)
        if (data.takenUntil)
            this.takenUntil = new Date(data.takenUntil)
        if (data.parkingSpotId)
            this.parkingSpotId = data.parkingSpotId
        if (data.pricePerHour)
            this.pricePerHour = new Prisma.Decimal(parseFloat(data.pricePerHour))
        if (data.durationInHours)
            this.durationInHours = parseInt(data.pricePerHour)
        if (data.finalPrice)
            this.finalPrice = new Prisma.Decimal(parseFloat(data.finalPrice))
        
        // if (this.takenFrom && this.takenUntil){
        //     const diffTime = Math.abs(this.takenUntil as any - (this.takenFrom as any));
        //     this.durationInHours = Math.ceil(diffTime / (1000 * 60 * 60));
        //     this.finalPrice = new Prisma.Decimal(this.durationInHours * (this.pricePerHour as number))
        // }
        if (data.parkedCarSign)
            this.parkedCarSign = data.parkedCarSign
    }
}
