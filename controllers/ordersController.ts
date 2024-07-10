import { NextFunction, Request, Response } from "express";
import OrdersService from "../services/ordersService";
import { IOrders, OrdersFromReqClass } from "../models/OrdersModel";
import { Prisma } from "@prisma/client";
import { ErrorCodes } from "../errorHandler/errorHandler";
import bigDecimal from "js-big-decimal";
import prisma from "../db/prisma";
import { IParkingSpot } from "../models/ParkingSpotModel";
import ordersService from "../services/ordersService";

export const post = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {takenFrom, takenUntil, ...OrdersData } = req.body;
                
        OrdersData.takenFrom = new Date(takenFrom)
        OrdersData.takenUntil = new Date(takenUntil)

        // const orders:IOrders[] = await prisma.orders.findMany({
        //     where: {
        //         parkingSpotId: OrdersData.parkingSpotId
        //     }
        // })
        // var status:number = 200
        // var conflictingOrder:Partial<IOrders> = {}
        // orders.forEach(order => {
        //     if (new Date(OrdersData.takenFrom) <= new Date(order.takenFrom) && new Date(OrdersData.takenUntil) > new Date(order.takenFrom)){
        //         conflictingOrder = order
        //         status = 409
        //         return
        //         // return res.status(409).json("Parking spot is taken in this period")
        //     }
        //     else if (new Date(OrdersData.takenFrom) > new Date(order.takenFrom) && new Date(OrdersData.takenFrom) < new Date(order.takenUntil)){
        //         conflictingOrder = order
        //         status = 409
        //         return
        //         // return res.status(409).json("Parking spot is taken in this period")
        //     }
        // });
        const response = await ordersService.checkTimeConstraints(OrdersData.takenFrom, OrdersData.takenUntil, OrdersData.parkingSpotId)
        if (response.status === 409){
            return res.status(409).json({
                error: "Parking spot is taken in this period",
                conflictingOrder: response.conflictingOrder
            })
        } 

        const diffTime = OrdersData.takenUntil - OrdersData.takenFrom;
        if (diffTime <= 0)
            return res.status(400).json("Date of order start is later than date of order end")
        OrdersData.durationInHours = Math.ceil(diffTime / (1000 * 60 * 60));
        // var product = bigDecimal.multiply("-0.13", "0.00130"); // product = "-0.000169"
        // OrdersData.finalPrice = new Prisma.Decimal(OrdersData.durationInHours * OrdersData.pricePerHour)
        OrdersData.finalPrice = new Prisma.Decimal(bigDecimal.multiply(OrdersData.durationInHours.toString(), OrdersData.pricePerHour.toString()))
        const createdOrders: object = await OrdersService.createOrder({
            ...OrdersData
        });

        res.status(200).json(
            createdOrders,
        );
        
    } catch (error) {
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === ErrorCodes.CONFLICT){
            res.status(409).json({
                message: "A parking place with such coordinates already exists",
                details: error.message
            })
        }
        else {
            next(error)
        }
    }
}


export const getAll = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {offset, ammount, ...params } = req.query;
        const skip = parseInt(req.query.offset as string) || 0
        const take = parseInt(req.query.ammount as string) || 10

        const filter:OrdersFromReqClass = new OrdersFromReqClass(params as any)

        const Orders: object[] | null = await OrdersService.findAllOrders(filter, skip, take);

        res.status(200).json(
            Orders
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError){
            res.status(400).json({
                message: "Bad Request",
                details: error.message
            })
        }
        else {
            next(error)
        }
    }
}

export const getById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;

        const result: object | null = await OrdersService.findOrderById(id);

        if (!result)
            return res.status(404).json({message: "Order with such ID doesn't exist"});

        res.status(200).json(
            result
        );
    } catch (error) {
        next(error)
    }
}

export const patch = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const {takenFrom, takenUntil, autoUpdate, ...newData} = req.body;

        if (takenFrom){
            newData.takenFrom = new Date(takenFrom)
        }
        if (takenUntil){
            newData.takenUntil =  new Date(takenUntil)
        }
        
        
        // const orders:IOrders[] = await prisma.orders.findMany({
        //     where: {
        //         parkingSpotId: OrdersData.parkingSpotId
        //     }
        // })
        // var status:number = 200
        // var conflictingOrder:Partial<IOrders> = {}
        // orders.forEach(order => {
        //     if (new Date(OrdersData.takenFrom) <= new Date(order.takenFrom) && new Date(OrdersData.takenUntil) > new Date(order.takenFrom)){
        //         conflictingOrder = order
        //         status = 409
        //         return
        //         // return res.status(409).json("Parking spot is taken in this period")
        //     }
        //     else if (new Date(OrdersData.takenFrom) > new Date(order.takenFrom) && new Date(OrdersData.takenFrom) < new Date(order.takenUntil)){
        //         conflictingOrder = order
        //         status = 409
        //         return
        //         // return res.status(409).json("Parking spot is taken in this period")
        //     }
        // });

        // if (status === 409){
        //     return res.status(409).json({
        //         error: "Parking spot is taken in this period",
        //         conflictingOrder: conflictingOrder
        //     })
        // }

        const response = await ordersService.checkTimeConstraints(new Date(takenFrom), new Date(takenUntil), newData.parkingSpotId, id)
        if (response.status === 409){
            return res.status(409).json({
                error: "Parking spot is taken in this period",
                conflictingOrder: response.conflictingOrder
            })
        } else if (response.status === 404){
            return res.status(404).json({
                error: "Order with such ID doesn't exist",
            })
        }

        if (autoUpdate && newData.pricePerHour || autoUpdate && newData.takenFrom || autoUpdate && newData.takenUntil) {
            const result: IOrders | null = await OrdersService.findOrderById(id);
            if (result) {
                newData.takenFrom = newData.takenFrom || result.takenFrom
                newData.takenUntil = newData.takenUntil || result.takenUntil
                const diffTime = newData.takenUntil - newData.takenFrom;
                if (diffTime <= 0)
                    return res.status(400).json("Date of order start is later than date of order end")
                newData.pricePerHour = newData.pricePerHour || result.pricePerHour
                newData.durationInHours = Math.ceil(diffTime / (1000 * 60 * 60));
                newData.finalPrice = new Prisma.Decimal(bigDecimal.multiply(newData.durationInHours.toString(), newData.pricePerHour.toString()))
            }
            else {
                return res.status(404).json("Order with such ID doesn't exist")
            }
        }
        else if (autoUpdate)
            return res.status(400).json("No properties were provided to initiate autoupdate")


        const result: object | null = await OrdersService.updateOrder(id, newData);

        res.status(200).json({
            status: "succesfully updated",
            result: result
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            // if (error.code === ErrorCodes.CONFLICT) {
            //     res.status(409).json({
            //         message: "Order with such coordinates already exists",
            //         details: error.message
            //     })
            // }
            if (error.code === ErrorCodes.NOT_FOUND) {
                res.status(404).json({
                    message: "Order with such ID doesn't exist",
                    
                })
            }
        }
        else {
            next(error)
        }
    }
}

export const remove = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;

        const result: object | null = await OrdersService.removeOrder(id);

        return res.sendStatus(204);
    } catch (error) {
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError && ErrorCodes.NOT_FOUND) {
            res.status(404).json({
                message: "Order with such ID doesn't exist"
            })
        }
        else {
            next(error)
        }
    }
}