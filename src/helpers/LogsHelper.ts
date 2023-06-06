import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        winston.format.json()
    ),
    defaultMeta: { service: 'LogsHelper' },
    transports: [
        new winston.transports.File({ filename: 'logs/info/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/error/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/debug/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'logs/debug/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'logs/debug/http.log', level: 'http' }),
    ],
});

export const Log = (level:string, className: string, functionName: string, message: string, params?: any) => {
    logger.log(level, { className: className, functionName: functionName, message: message });
};