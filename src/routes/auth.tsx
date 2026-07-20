import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Bonlife" },
      {
        name: "description",
        content: "Sign in to manage the Bonlife knowledge base.",
      },
    ],
  }),
  validateSearch: (s) => searchSchema.parse(s),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, bounce out.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate({ to: (redirect as "/admin/knowledge-base") ?? "/admin/knowledge-base" });
      }
    });
  }, [navigate, redirect]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: (redirect as "/admin/knowledge-base") ?? "/admin/knowledge-base" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[460px] flex-col px-6 py-20 sm:px-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
          Admin access
        </div>
        <h1 className="mt-2 font-display text-[36px] font-semibold leading-[1.1] text-navy">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>
        <p className="mt-3 text-[14px] leading-[1.6] text-navy/70">
          The Knowledge Base backend is admin-only. The first person to sign up
          becomes admin automatically; existing admins can invite others from
          the backend.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-hairline bg-surface-tint px-3 py-2.5 text-[15px] text-navy focus:border-navy focus:outline-none"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
              Password
            </span>
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-hairline bg-surface-tint px-3 py-2.5 text-[15px] text-navy focus:border-navy focus:outline-none"
            />
          </label>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {error}
            </div>
          ) : null}

          <Button type="submit" variant="primary" disabled={busy}>
            {busy ? <Loader2 size={14} className="animate-spin" /> : null}
            {mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === "signin" ? "signup" : "signin");
          }}
          className="mt-6 text-[13px] text-navy/70 underline underline-offset-2 hover:text-navy"
        >
          {mode === "signin"
            ? "No account yet? Create one"
            : "Already have an account? Sign in"}
        </button>
      </main>
      <SiteFooter />
    </>
  );
}
