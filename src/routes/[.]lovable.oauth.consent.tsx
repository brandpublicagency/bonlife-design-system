import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";

type OAuthResult = { data: any; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  head: () => ({ meta: [{ title: "Connect an assistant - Bonlife" }, { name: "robots", content: "noindex" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/auth", search: { redirect: location.pathname + location.searchStr } });
    }
  },
  loader: async ({ location }) => {
    const id = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(id);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-[520px] px-6 py-24 text-center text-navy">
      Could not load this request: {String((error as Error)?.message ?? error)}
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = details?.client?.name ?? "An assistant";

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect was returned. Please try again.");
      return;
    }
    window.location.href = target;
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[520px] px-6 py-20">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">Connect</div>
        <h1 className="mt-2 font-display text-[32px] font-semibold leading-[1.1] text-navy">
          Connect {name} to your account
        </h1>
        <p className="mt-3 text-[14px] leading-[1.6] text-navy/70">
          {name} will be able to read the Bonlife Knowledge Base and, if you are an admin, edit it as you.
        </p>
        {error ? (
          <p role="alert" className="mt-4 text-[13px] text-red-700">{error}</p>
        ) : null}
        <div className="mt-8 flex gap-3">
          <Button variant="primary" disabled={busy} onClick={() => decide(true)}>Approve</Button>
          <Button variant="ghost" disabled={busy} onClick={() => decide(false)}>Deny</Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
