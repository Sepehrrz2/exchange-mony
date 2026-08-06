FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate && npm run build
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app ./
RUN mkdir -p storage
EXPOSE 4000
CMD ["sh","-c","npx prisma migrate deploy && node dist/main.js"]
