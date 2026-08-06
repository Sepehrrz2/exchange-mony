import { Global, Module } from '@nestjs/common';
import winston from 'winston';
export const LOGGER = Symbol('LOGGER');
@Global()
@Module({ providers: [{ provide: LOGGER, useFactory: () => winston.createLogger({ level: 'info', format: winston.format.json(), transports: [new winston.transports.Console()] }) }], exports: [LOGGER] })
export class LoggerModule {}
