import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExchangeRatesService } from './exchange-rates.service';
@ApiTags('exchange-rates') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('exchange-rates')
export class ExchangeRatesController { constructor(private readonly service: ExchangeRatesService) {} @Get() getRates() { return this.service.getRates(); } }
