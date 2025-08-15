# Multi-stage Dockerfile para desarrollo y producción

# Etapa base
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Etapa de desarrollo
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Etapa de construcción
FROM base AS build
RUN npm ci --only=production
COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production
WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copiar archivos de producción
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/package*.json ./

USER nodejs

EXPOSE 3000

CMD ["npm", "start"]