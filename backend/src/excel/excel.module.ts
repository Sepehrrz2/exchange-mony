import { Module } from '@nestjs/common';
import { ExchangeRatesModule } from '../exchange-rates/exchange-rates.module';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
@Module({ imports: [ExchangeRatesModule], controllers: [ExcelController], providers: [ExcelService] })
export class ExcelModule {}
