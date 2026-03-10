import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../../generated/prisma/client";

import { env } from "../../../shared/config/env";

let pool: Pool | null = null;
let client: PrismaClient | null = null;
let currentDatabaseUrl: string | null = null;

function resolveDatabaseUrl() {
  return process.env.DATABASE_URL ?? env.DATABASE_URL;
}

function parseDatabaseConfig(databaseUrl: string) {
  const parsedUrl = new URL(databaseUrl);
  const schema = parsedUrl.searchParams.get("schema") ?? "public";
  parsedUrl.searchParams.delete("schema");

  return {
    connectionString: parsedUrl.toString(),
    schema
  };
}

function createPrismaClient(databaseUrl: string) {
  const { connectionString, schema } = parseDatabaseConfig(databaseUrl);

  pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool, { schema });

  client = new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["warn", "error"]
  });
  currentDatabaseUrl = databaseUrl;

  return client;
}

function getClient() {
  const databaseUrl = resolveDatabaseUrl();

  if (!client) {
    return createPrismaClient(databaseUrl);
  }

  if (currentDatabaseUrl !== databaseUrl) {
    const previousClient = client;
    const previousPool = pool;

    client = null;
    pool = null;
    currentDatabaseUrl = null;

    void previousClient.$disconnect();
    void previousPool?.end();

    return createPrismaClient(databaseUrl);
  }

  return client;
}

export async function resetPrismaClient() {
  const previousClient = client;
  const previousPool = pool;

  client = null;
  pool = null;
  currentDatabaseUrl = null;

  if (previousClient) {
    await previousClient.$disconnect();
  }

  if (previousPool) {
    await previousPool.end();
  }
}

export const prismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const activeClient = getClient();
    return Reflect.get(activeClient, prop, activeClient);
  }
});
