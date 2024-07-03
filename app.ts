import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { CustomError, IErrorResponse } from '../Parking-back/errorHandler/errorHandler';

const PORT = process.env.PORT || 3500;

import ParkingPlaceRouter from './routes/parkingPlaceRouter'
import ParkingSpotRouter from './routes/parkingSpotRouter'
import OrdersRouter from './routes/ordersRouter'
// import UserRouter from './routes/userRouter'
// import CarRouter from './routes/carRouter'

import globalErrorHandler from './middleware/errorCatcher';
const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(ParkingPlaceRouter)
app.use(ParkingSpotRouter)
app.use(OrdersRouter)
// app.use(UserRouter)
// app.use(CarRouter)

globalErrorHandler(app)
// app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
//     console.log(1)
//   // log.error(error);
//   console.log(error)
//   if (error instanceof CustomError) {
//     return res.status(error.statusCode).json(error.serializeErrors());
//   }
//   next();
// });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



module.exports = app;

