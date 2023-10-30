FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
# RUN pnpm i -g typescript
RUN pnpm run build

FROM nginx:stable-alpine
WORKDIR /app
RUN mkdir ./dist
COPY --from=builder /app/dist /app/dist
COPY ./nginx/default.conf /etc/nginx/conf.d
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
