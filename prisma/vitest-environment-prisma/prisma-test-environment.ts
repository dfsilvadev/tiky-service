import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { URL } from "node:url";

import { Pool } from "pg";
import { afterAll, beforeAll } from "vitest";

import { resetPrismaClient } from "../../src/infrastructure/persistence/prisma/prisma-client";

const defaultDatabaseUrl =
  process.env.E2E_DATABASE_URL ?? process.env.DATABASE_URL;

if (!defaultDatabaseUrl) {
  throw new Error(
    "E2E_DATABASE_URL or DATABASE_URL must be defined to run e2e tests"
  );
}

const schemaName = `e2e_${randomUUID().replaceAll("-", "")}`;
const baseDatabaseUrl = process.env.DATABASE_URL;
const schemaUrl = new URL(defaultDatabaseUrl);
schemaUrl.searchParams.set("schema", schemaName);
process.env.DATABASE_URL = schemaUrl.toString();

const adminUrl = new URL(defaultDatabaseUrl);
adminUrl.searchParams.set("schema", "public");

const pool = new Pool({
  connectionString: adminUrl.toString()
});

beforeAll(async () => {
  try {
    await pool.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
  } catch (error) {
    throw new Error(
      `Failed to connect to PostgreSQL for e2e tests. ` +
        `Check if the database is running and DATABASE_URL/E2E_DATABASE_URL is correct. ` +
        `Current URL host: ${adminUrl.host}. Original error: ${String(error)}`,
      {
        cause: error
      }
    );
  }

  execSync("pnpm prisma migrate deploy --config prisma.config.ts", {
    stdio: "inherit"
  });

  await resetPrismaClient();
}, 30_000);

afterAll(async () => {
  await resetPrismaClient();
  process.env.DATABASE_URL = baseDatabaseUrl;

  try {
    await pool.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
  } catch {
    // Ignore cleanup failure when DB is unavailable.
  } finally {
    await pool.end();
  }
}, 30_000);
