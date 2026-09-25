import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";
import type { Database } from "@/integrations/supabase/types";

type RuntimeGlobals = typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

function runtimeEnv(name: string): string | undefined {
  return (globalThis as RuntimeGlobals).process?.env?.[name]?.trim() || undefined;
}

function first(names: string[]): string | undefined {
  for (const n of names) {
    const v = runtimeEnv(n);
    if (v) return v;
  }
  return undefined;
}

function projectUrl(): string {
  const url = first(["SUPABASE_URL", "VITE_SUPABASE_URL"]);
  if (!url) throw new Error("SUPABASE_URL is required");
  return url;
}

function publishableKey(): string {
  const direct = first(["SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY"]);
  if (direct) return direct;
  const keyset = runtimeEnv("SUPABASE_PUBLISHABLE_KEYS");
  if (keyset) {
    try {
      const parsed = JSON.parse(keyset) as Record<string, unknown>;
      const key = [parsed.default, ...Object.values(parsed)].find(
        (v): v is string => typeof v === "string" && v.startsWith("sb_publishable_"),
      );
      if (key) return key;
    } catch {
      /* fall through */
    }
  }
  const legacy = first(["SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY"]);
  if (legacy) return legacy;
  throw new Error("Supabase publishable key is required");
}

export function supabaseForUser(ctx: ToolContext) {
  const token = ctx.getToken();
  if (!token) throw new Error("A verified sign-in is required");
  return createClient<Database>(projectUrl(), publishableKey(), {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
