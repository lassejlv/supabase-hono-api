import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "@/env";
import UserRouter from "@/routes/user";
import BucketsRouter from "@/routes/bucket";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.basePath("/api").route("/users", UserRouter).route("/buckets", BucketsRouter);

app.get("/", (c) => {
  const routes = app.routes.filter((route) => !route.path.includes("*"));

  return c.json({
    message: "Hello World!",
    routes,
  });
});

Bun.serve({
  fetch: app.fetch,
});

console.log(`Server running on port ${env.PORT}`);
