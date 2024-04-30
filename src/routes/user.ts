import { Hono } from "hono";
import { client } from "../supabase";

const router = new Hono();

router.get("/", async (c) => {
  const { data, error } = await client.from("users").select("*");

  if (error) {
    c.status(500);
    return c.json({ error: error.message });
  } else {
    return c.json(data.map((user) => ({ id: user.id, name: user })));
  }
});

router.get("/:id", async (c) => {
  const id = c.req.param("id");
  const { data, error } = await client.from("users").select("*").eq("id", id).single();

  if (error) {
    c.status(500);
    return c.json({ error: error.message });
  } else {
    return c.json(data);
  }
});

router.post("/", async (c) => {
  try {
    const { name, age } = await c.req.json();

    if (!name || !age) {
      c.status(400);
      return c.json({ error: "Name and age are required" });
    }

    const { data, error } = await client.from("users").insert([{ name, age }]);

    if (error) {
      c.status(500);
      return c.json({ error: error.message });
    } else {
      return c.json({ message: "created" });
    }
  } catch (error: any) {
    c.status(400);
    return c.json({ error: error.message });
  }
});

export default router;
