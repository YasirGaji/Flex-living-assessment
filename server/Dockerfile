FROM node:20-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .
RUN npx prisma generate
RUN npm run build 

# --- Production Runtime ---
FROM node:20-slim

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist


COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma 


COPY .env ./.env 

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD [ "npm", "start" ]