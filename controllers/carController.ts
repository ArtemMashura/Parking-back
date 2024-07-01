// import { Request, Response } from "express";
// import CarService from "../services/carService";

// export const post = async (req: Request, res: Response) => {
//     try {
//         const { ...CarData } = req.body;

//         const createdCar: object = await CarService.createCar({
//             ...CarData
//         });

//         res.status(200).json(
//             createdCar,
//         );
        
//     } catch (error) {
//         res.status(500).json({
//             message: error,
//         });
//     }
// }


// export const getAll = async (req: Request, res: Response) => {
//     try {
//         const Cars: object[] | null = await CarService.findAllCars();

//         res.status(200).json(
//             Cars
//         );
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal error",
//         });
//     }
// }

// export const getById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const result: object | null = await CarService.findCarById(id);

//         if (!result)
//             return res.status(404).json({message: "Parking place not found"});

//         res.status(200).json(
//             result
//         );
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal error",
//         });
//     }
// }

// export const patch = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const {...newData} = req.body;

//         const result: object | null = await CarService.updateCar(id, newData);

//         if (!result)
//             return res.status(404).json({message: "Parking place not found"});

//         res.status(200).json(
//             result,
//         );
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal error",
//         });
//     }
// }

// export const remove = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const result: object | null = await CarService.removeCar(id);

//         if (!result)
//             return res.status(404).json({message: "Parking place not found"});
        
//         res.status(200).json(
//             result
//         );
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal error",
//         });
//     }
// }