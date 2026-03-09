FROM node:22-alpine

WORKDIR /app

ARG DATABASE_URL=postgres://postgres:postgres@localhost:5432/tiky_service?schema=public
ENV DATABASE_URL=${DATABASE_URL}

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma:generate && pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
