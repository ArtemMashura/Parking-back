import { Application, NextFunction, Request, Response, } from 'express';
import HTTP_STATUS from 'http-status-codes';
import Logger from 'bunyan';
import { CustomError, IErrorResponse } from '../errorHandler/errorHandler';
import 'express-async-errors';
import { Prisma } from '@prisma/client';

const globalErrorHandler = (app: Application): void => {
    const log: Logger = Logger.createLogger({ name:"server", level: 'debug' });
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
        log.error(error)
        if (error instanceof Prisma.PrismaClientInitializationError && error.errorCode === undefined) {
        // The .code property can be accessed in a type-safe manner
            res.status(500).json({
                message: "Can't reach database",
            })
        }
        else if (error instanceof CustomError) {
            return res.status(error.statusCode).json(error.serializeErrors());
        }
        else {
            console.log(error)
            res.status(500).json({
                message: "Internal error",
            });
        }
    });


}

export default globalErrorHandler