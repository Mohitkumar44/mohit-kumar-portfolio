import app from "./app";
import { logger } from "./lib/logger";

export default app;

const rawPort = process.env["PORT"];

if (!process.env.VERCEL) {
  const port = rawPort ? Number(rawPort) : 3000;

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  const server = app.listen(port, () => {
    logger.info({ port }, "Server listening");
  });

  server.on("error", (err) => {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  });
}

