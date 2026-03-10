import { config } from "dotenv";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

config();

export default defineConfig({
  schema: path.join("prisma"),
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL")
  }
});
