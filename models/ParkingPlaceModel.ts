export interface IParkingPlace {
    name:  string
    coordX: number
    coordY: number
    
}

export interface IParkingPlaceFromReq {
    name:  string
    coordX: string
    coordY: string
}

export class ParkingPlaceClass {
    name?:  string
    coordX?: number
    coordY?: number
    
    constructor(data:IParkingPlaceFromReq){
        if (data.name)
            this.name = data.name
        if (data.coordX)
            this.coordX = parseFloat(data.coordX)
        if (data.coordY)
            this.coordY = parseFloat(data.coordY)
    }
}
