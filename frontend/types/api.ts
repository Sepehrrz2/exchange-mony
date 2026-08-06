export type ExchangeRatesResponse = { rates: { USD: number; EUR: number; CNY: number }; updatedAt: string; expiresAt: number };
export type ExcelJob = { id: string; originalName: string; status: 'PROCESSING' | 'COMPLETED' | 'FAILED'; errorMessage?: string | null };
