import prisma from '../db/prisma';
import { IOrders, IOrdersCheckConstraints, OrdersFromReqClass } from "../models/OrdersModel";

class OrdersService {
    async createOrder(OrdersData: IOrders): Promise<IOrders> {  
        return await prisma.orders.create({data : OrdersData});
    }
    async findAllOrders(filter: OrdersFromReqClass, skip: number, take: number): Promise<IOrders[] | null> {
        return await prisma.orders.findMany({
            where: filter,
            skip,
            take
        });
    }
    async findOrderById(id: string): Promise<IOrders | null> {
        return await prisma.orders.findUnique({where: {
            id: id,
        }});
    }
    async updateOrder(id: string, OrdersData: Partial<IOrders>): Promise<IOrders | null> {
        return await prisma.orders.update({
            where : {
                id: id
            },
            data: OrdersData
        })
    }
    async checkTimeConstraints(takenFrom: Date, takenUntil: Date, parkingSpotId: string, id?: string): Promise<IOrdersCheckConstraints> {
        if (id){
            const originalOrder = await prisma.orders.findUnique({
                where: {
                    id
                }
            })
            if (originalOrder !== null){
                if (!takenFrom)
                    takenFrom = originalOrder.takenFrom
                if (!takenUntil)
                    takenFrom = originalOrder.takenFrom
                if (!parkingSpotId)
                    parkingSpotId = originalOrder.parkingSpotId
            }
            else {
                return {
                    status: 400,
                    conflictingOrder: null
                }
            }
        }
        const orders:IOrders[] = await prisma.orders.findMany({
            where: {
                parkingSpotId: parkingSpotId
            }
        })
        var status:number = 200
        var conflictingOrder:Partial<IOrders> = {}
        orders.forEach(order => {
            if (new Date(takenFrom) <= new Date(order.takenFrom) && new Date(takenUntil) > new Date(order.takenFrom)){
                conflictingOrder = order
                status = 409
                return
                // return res.status(409).json("Parking spot is taken in this period")
            }
            else if (new Date(takenFrom) > new Date(order.takenFrom) && new Date(takenFrom) < new Date(order.takenUntil)){
                conflictingOrder = order
                status = 409
                return
                // return res.status(409).json("Parking spot is taken in this period")
            }
        });

        return {
            status: status,
            conflictingOrder: conflictingOrder
        }
    }
    async removeOrder(id: string): Promise<object | null> {
        return await prisma.orders.delete({
            where : {
                id: id
            }
        })
    }
}

export default new OrdersService();