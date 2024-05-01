import { client } from "@/supabase";
import { Hono } from "hono";

const router = new Hono();

router.get("/", async (c) => {
  return c.json({ message: "Hello from buckets!" });
});

export default router;
