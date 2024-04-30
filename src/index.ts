import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import UserRouter from "./routes/user";

import { env } from "./env";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.route("/users", UserRouter);

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

Bun.serve({
  fetch: app.fetch,
});

console.log(`Server running on port ${env.PORT}`);
