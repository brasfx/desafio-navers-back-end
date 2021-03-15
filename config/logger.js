import winston from 'winston';
import winstondb from 'winston-mongodb';
import dotenv from 'dotenv';
dotenv.config();

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: process.env.MONGODB_CONECTION,
      collection: 'logs',
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: 'desafio-navers' }),
    format.timestamp(),
    myFormat
  ),
});

export { logger };
