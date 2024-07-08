import { NextFunction, Request, Response } from "express";
import OrdersService from "../services/ordersService";
import { IOrders, OrdersFromReqClass } from "../models/OrdersModel";
import { Prisma } from "@prisma/client";
import { ErrorCodes } from "../errorHandler/errorHandler";
import prisma from "../db/prisma";
import { IParkingSpot } from "../models/ParkingSpotModel";

export const post = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {takenFrom, takenUntil, ...OrdersData } = req.body;
                
        OrdersData.takenFrom = new Date(takenFrom)
        OrdersData.takenUntil = new Date(takenUntil)

        const parkingspots:IParkingSpot[] = await prisma.parkingSpot.findMany({
            include: {
                pendingOrders: true
            }
        })

        parkingspots.forEach(parkingspot => {
            console.log(parkingspot.pendingOrders)
        });

        // const diffTime = OrdersData.takenUntil - OrdersData.takenFrom;
        // if (diffTime <= 0)
        //     return res.status(400).json("Date of order start is later than date of order end")
        // OrdersData.durationInHours = Math.ceil(diffTime / (1000 * 60 * 60));
        // OrdersData.finalPrice = OrdersData.durationInHours * OrdersData.pricePerHour

        // const createdOrders: object = await OrdersService.createOrder({
        //     ...OrdersData
        // });

        res.status(200).json(
            "ads",
        );
        
    } catch (error) {
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
                newData.finalPrice = newData.durationInHours * newData.pricePerHour
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

        res.status(204);
    } catch (error) {
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