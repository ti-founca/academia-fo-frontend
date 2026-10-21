# ---- Etapa 1: compilación ----
FROM docker.io/library/node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# ---- Etapa 2: servidor (≈ 12-15 MB) ----
FROM docker.io/nginxinc/nginx-unprivileged:alpine-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/academia-fo-frontend/browser /usr/share/nginx/html
EXPOSE 8080