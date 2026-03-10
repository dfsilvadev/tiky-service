FROM node:20-alpine AS base

WORKDIR /app

RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build

ARG DATABASE_URL=postgres://postgres:postgres@localhost:5432/tiky_service?schema=public
ENV DATABASE_URL=${DATABASE_URL}

COPY . .
RUN pnpm prisma:generate && pnpm build

FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/src/generated ./build/generated
COPY package.json ./

EXPOSE 3000

CMD ["node", "build/server.cjs"]
