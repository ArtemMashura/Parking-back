import HTTP_STATUS from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors:ErrorCodes;

  constructor(message:string, errorCode: ErrorCodes, statusCode: number, error: any){
    super(message)
    this.message = message
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.errors = error
  }
}

export enum ErrorCodes {
  NOT_FOUND = "P2025",
  ALREADY_EXISTS = 1002,
  CONFLICT = "P2002"
}