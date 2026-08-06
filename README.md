# Exchange Mony

Production-ready full-stack SaaS for authenticated Excel price conversion to USD, EUR, and CNY.

## Stack
- Backend: NestJS, Prisma, PostgreSQL, JWT, Multer, ExcelJS, Swagger, Winston, bcrypt
- Frontend: Next.js App Router, React, TypeScript, Tailwind, shadcn-style UI, React Query, React Hook Form, Axios

## Quick start
```bash
cp .env.example .env
docker compose up --build
```

Frontend: http://localhost:3000  
Backend Swagger: http://localhost:4000/docs

## Exchange API
The backend uses the real Open Exchange Rates API. Set `OPEN_EXCHANGE_RATES_APP_ID` in `.env`.

## Excel format
Upload `.xlsx` or `.xls` files containing `Product Name`, `SKU`, `Quantity`, and `Base Price`. The processed workbook adds `Price USD`, `Price EUR`, and `Price CNY`.
