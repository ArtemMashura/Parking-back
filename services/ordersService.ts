import prisma from '../db/prisma';
import { IOrders, OrdersFromReqClass } from "../models/OrdersModel";

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
    async removeOrder(id: string): Promise<IOrders | null> {
        return await prisma.orders.delete({
            where : {
                id: id
            }
        })
    }
}

export default new OrdersService();