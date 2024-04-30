import { createClient } from "@supabase/supabase-js";
import { env } from "./env";
import type { Database } from "./database.types";

export const client = createClient<Database>(env.SUPABASE_DOMAIN, env.SUPABASE_ANON_KEY);
