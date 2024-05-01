import { Hono } from "hono";
import { client } from "@/supabase";
import { zValidator } from "@hono/zod-validator";
import { UserSchemaCreate, UserSchemaUpdate } from "@/types/zod";

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

router.post("/", zValidator("json", UserSchemaCreate), async (c) => {
  const { name, age } = await c.req.valid("json");

  const { data, error } = await client
    .from("users")
    .insert({
      name,
      age,
    })
    .select()
    .single();

  if (error) {
    c.status(500);
    return c.json({ error: error.message });
  } else {
    return c.json({ message: "created", data });
  }
});

router.put("/:id", zValidator("json", UserSchemaUpdate), async (c) => {
  const id = c.req.param("id");
  const { name, age } = await c.req.valid("json");

  const { data, error } = await client.from("users").select().eq("id", id).single();

  if (error) {
    c.status(500);
    return c.json({ error: error.message });
  }

  const updated = await client
    .from("users")
    .update({ name: name ?? data.name, age: age ?? data.age })
    .eq("id", id);

  if (updated.error) {
    c.status(500);
    return c.json({ error: updated.error.message });
  }

  return c.json({ message: "updated" });
});

router.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const { data, error } = await client.from("users").delete().eq("id", id).select().single();

  if (error) {
    c.status(500);
    return c.json({ error: error.message });
  }

  return c.json({ message: "deleted", data });
});

export default router;
