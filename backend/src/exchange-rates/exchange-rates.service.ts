import { BadGatewayException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';
type Rates = { USD: number; EUR: number; CNY: number };
@Injectable()
export class ExchangeRatesService {
  private cached?: { rates: Rates; updatedAt: string; expiresAt: number };
  async getRates() { if (this.cached && this.cached.expiresAt > Date.now()) return this.cached; const appId = process.env.OPEN_EXCHANGE_RATES_APP_ID; if (!appId) throw new ServiceUnavailableException('Exchange API key is not configured'); try { const { data } = await axios.get<{ timestamp: number; rates: Record<string, number> }>('https://openexchangerates.org/api/latest.json', { params: { app_id: appId, symbols: 'USD,EUR,CNY' }, timeout: 8000 }); const rates = { USD: data.rates.USD, EUR: data.rates.EUR, CNY: data.rates.CNY }; if (!rates.USD || !rates.EUR || !rates.CNY) throw new Error('Incomplete exchange API response'); this.cached = { rates, updatedAt: new Date(data.timestamp * 1000).toISOString(), expiresAt: Date.now() + 300000 }; return this.cached; } catch { throw new BadGatewayException('Exchange rates provider is unavailable'); } }
}
