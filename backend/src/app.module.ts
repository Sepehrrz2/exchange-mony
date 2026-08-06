import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { ExcelModule } from './excel/excel.module';
import { LoggerModule } from './logger/logger.module';
@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule, DatabaseModule, AuthModule, ExchangeRatesModule, ExcelModule] })
export class AppModule {}
