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
import ZoneRouter from './routes/zoneRouter'
import MapPointRouter from './routes/mapPointRouter'
// import UserRouter from './routes/userRouter'
// import CarRouter from './routes/carRouter'

import globalErrorHandler from './middleware/errorCatcher';
import prisma, { connect_db } from './db/prisma';
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
app.use(ZoneRouter)
app.use(MapPointRouter)
// app.use(UserRouter)
// app.use(CarRouter)

globalErrorHandler(app)

connect_db()

// prisma.mapPoint.createMany({
//     data: [
//         {"lat":48.473581673858746, "lng":35.02462559264743, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//         {"lat":48.479968391553015,"lng":35.02799755159381, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//         {"lat":48.477349934545146,"lng":35.03425976106566, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//         {"lat":48.47281521370465,"lng":35.04206343748443, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"}, 
//             {"lat":48.46617207403549,"lng":35.06605251684583, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"}, 
//             {"lat":48.45707418887543,"lng":35.06827648758932, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"}, 
//             {"lat":48.456732660054044,"lng":35.06973560926765, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.44517624771024,"lng":35.056431852788776, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.45360187213135,"lng":35.03814991646621, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.45963562078605,"lng":35.00690753704946, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.46629463756859 ,"lng":35.002959325449275, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.47130255318085,"lng":35.00707919842338, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.4732372973103,"lng":35.00879581216259, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.47557027299573,"lng":35.01600558986726, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"},
//             {"lat":48.474033935215395,"lng":35.02390201306762, zoneId: "ba809506-a949-4f6d-9c89-69cd73a32356"} 
//       ],
//       skipDuplicates: true,
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



module.exports = app;

