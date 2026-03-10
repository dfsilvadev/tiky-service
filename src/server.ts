import { logger } from "./infrastructure/logger";
import { app } from "./presentation/server/app";

import { env } from "./shared/config/env";

const start = async () => {
  try {
    await app.listen({
      host: "0.0.0.0",
      port: env.PORT
    });

    logger.debug(
      `[APP] 🚀 HTTP Server Running on http://localhost:${env.PORT}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
