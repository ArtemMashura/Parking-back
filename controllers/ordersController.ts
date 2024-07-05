import { Request, Response } from "express";
import OrdersService from "../services/ordersService";

export const post = async (req: Request, res: Response) => {
    try {
        const {takenFrom, takenUntil, ...OrdersData } = req.body;
                
        OrdersData.takenFrom = new Date(takenFrom)
        OrdersData.takenUntil = new Date(takenUntil)

        const diffTime = Math.abs(OrdersData.takenUntil - OrdersData.takenFrom);
        OrdersData.durationInHours = Math.ceil(diffTime / (1000 * 60 * 60));
        OrdersData.finalPrice = OrdersData.durationInHours * OrdersData.pricePerHour

        const createdOrders: object = await OrdersService.createOrder({
            ...OrdersData
        });

        res.status(200).json(
            createdOrders,
        );
        
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
}


export const getAll = async (req: Request, res: Response) => {
    try {
        const Orders: object[] | null = await OrdersService.findAllOrders();

        res.status(200).json(
            Orders
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: object | null = await OrdersService.findOrderById(id);

        if (!result)
            return res.status(404).json({message: "Parking place not found"});

        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {takenFrom, takenUntil, ...newData} = req.body;
        if (takenFrom){
            newData.takenFrom = new Date(newData.takenFrom)
        }
        if (takenUntil){
            newData.takenUntil = new Date(newData.takenUntil)
        }
        const result: object | null = await OrdersService.updateOrder(id, newData);

        if (!result)
            return res.status(404).json({message: "Parking place not found"});

        res.status(200).json(
            result,
        );
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal error",
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: object | null = await OrdersService.removeOrder(id);

        if (!result)
            return res.status(404).json({message: "Parking place not found"});
        
        res.status(200).json(
            result
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
        });
    }
}