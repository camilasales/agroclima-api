import { Request, Response, NextFunction } from "express";
import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        winston.format.json()
    ),
    defaultMeta: { service: 'logs.middleware' },
    transports: [
        new winston.transports.File({ filename: 'logs/http/http.log', level: 'http' }),
    ],
});

export const logs = (request: Request, response: Response, next: NextFunction) => {
    let req = {
        url: request.path,
        method: request.method,
        params: request.params,
        body: request.body,
    }

    let res = {
        message: response.statusMessage,
        status: response.statusCode,
    }

    logger.log('http', { request: req, response: res });

    next();
};