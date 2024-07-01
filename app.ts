import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors'
const PORT = process.env.PORT || 3500;

import ParkingPlaceRouter from './routes/parkingPlaceRouter'
import ParkingSpotRouter from './routes/parkingSpotRouter'
import OrdersRouter from './routes/ordersRouter'
// import UserRouter from './routes/userRouter'
// import CarRouter from './routes/carRouter'

var indexRouter = require('./routes/index');

const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(ParkingPlaceRouter)
app.use(ParkingSpotRouter)
app.use(OrdersRouter)
// app.use(UserRouter)
// app.use(CarRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next: NextFunction) {
//   next(createError(404));
// });

// // // error handler
// app.use(function(err:any, req: Request, res: Response, next: NextFunction) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
