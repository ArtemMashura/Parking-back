// import { Request, Response } from "express";
// import UserService from "../services/userService";
// import {hashSync} from 'bcrypt'
// export const post = async (req: Request, res: Response) => {
//     try {
//         const {password, ...UserData } = req.body;

//         UserData.passwordHash = hashSync(password, 10)

//         const createdUser: object = await UserService.createUser({
//             ...UserData
//         });

//         res.status(200).json(
//             createdUser,
//         );
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: error,
//         });
//     }
// }


// export const getAll = async (req: Request, res: Response) => {
//     try {
//         const Users: object[] | null = await UserService.findAllUsers();

//         res.status(200).json(
//             Users
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

//         const result: object | null = await UserService.findUserById(id);

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

//         const result: object | null = await UserService.updateUser(id, newData);

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

//         const result: object | null = await UserService.removeUser(id);

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