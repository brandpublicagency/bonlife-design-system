import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { Badge } from "@/components/bonlife/Badge";
import { Card } from "@/components/bonlife/Card";
import { Button } from "@/components/bonlife/Button";
import { IconButton } from "@/components/bonlife/IconButton";
import { Input } from "@/components/bonlife/Input";
import { Select } from "@/components/bonlife/Select";
import { Checkbox } from "@/components/bonlife/Checkbox";
import { Radio } from "@/components/bonlife/Radio";
import { Switch } from "@/components/bonlife/Switch";
import { PlanCard } from "@/components/bonlife/PlanCard";
import { PlanRow } from "@/components/bonlife/PlanRow";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/bonlife/Tabs";
import { Accordion } from "@/components/bonlife/Accordion";
import { Dialog } from "@/components/bonlife/Dialog";
import { Tooltip } from "@/components/bonlife/Tooltip";
import { BonlifeToaster, toast } from "@/components/bonlife/Toast";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — Bonlife Design System" },
      {
        name: "description",
        content:
          "Buttons, inputs, cards, plan cards, dialogs, tooltips — every Bonlife component with live variants.",
      },
      { property: "og:title", content: "Components — Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Buttons, inputs, cards, plan cards, dialogs, tooltips — every Bonlife component with live variants.",
      },
      { property: "og:url", content: "/components" },
    ],
    links: [{ rel: "canonical", href: "/components" }],
  }),
  component: ComponentsPage,
});

const GROUPS = [
  {
    label: "Core",
    items: [
      { id: "button", label: "Button" },
      { id: "iconbutton", label: "IconButton" },
      { id: "badge", label: "Badge" },
    ],
  },
  {
    label: "Layout",
    items: [{ id: "card", label: "Card" }],
  },
  {
    label: "Forms",
    items: [{ id: "forms", label: "Form controls" }],
  },
  {
    label: "Product",
    items: [
      { id: "plancard", label: "PlanCard" },
      { id: "planrow", label: "PlanRow" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "accordion", label: "Accordion" },
    ],
  },
  {
    label: "Overlay",
    items: [
      { id: "dialog", label: "Dialog" },
      { id: "toast", label: "Toast" },
      { id: "tooltip", label: "Tooltip" },
    ],
  },
];

function Spec({
  id,
  name,
  count,
  intro,
  children,
}: {
  id: string;
  name: string;
  count?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-hairline pt-14 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h3 className="!m-0 !text-[26px]">{name}</h3>
        {count ? (
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {count}
          </span>
        ) : null}
      </div>
      {intro ? (
        <p className="mb-6 max-w-2xl text-[14px] leading-[1.65] text-muted-foreground">
          {intro}
        </p>
      ) : null}
      <div className="overflow-hidden rounded-xl border border-hairline">
        <div className="border-b border-hairline bg-surface-tint p-8 [background-image:radial-gradient(circle,rgba(12,28,62,0.06)_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="[&_*]:relative">{children}</div>
        </div>
      </div>
    </section>
  );
}

function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <BonlifeToaster />

      <PageHeader
        eyebrow="Components"
        title="Seventeen building blocks."
        lead="Every component is built from the Bonlife tokens — navy chrome, coral CTAs, Onest headings, Inter body. Nothing hard-coded, nothing decorative."
      />

      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)]">
          {/* Sidebar TOC */}
          <aside className="md:sticky md:top-24 md:self-start">
            <nav className="space-y-5">
              {GROUPS.map((g) => (
                <div key={g.label}>
                  <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {g.label}
                  </div>
                  <ul className="space-y-0.5">
                    {g.items.map((it) => (
                      <li key={it.id}>
                        <a
                          href={`#${it.id}`}
                          className="block rounded-md px-2.5 py-1.5 font-display text-[13px] font-semibold text-navy/70 transition-colors hover:bg-surface-muted hover:text-navy"
                        >
                          {it.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-14">
            <Spec id="button" name="Button" count="4 variants · 3 sizes" intro="Primary navy, secondary coral, ghost, outline.">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </Spec>

            <Spec id="iconbutton" name="IconButton" intro="Round, icon-only actions.">
              <div className="flex items-center gap-3">
                <IconButton aria-label="Call"><Phone size={18} /></IconButton>
                <IconButton aria-label="Chat" variant="secondary"><MessageCircle size={18} /></IconButton>
                <IconButton aria-label="Branch" variant="primary"><MapPin size={18} /></IconButton>
              </div>
            </Spec>

            <Spec id="badge" name="Badge" count="9 tones" intro="Neutral, brand, semantic, and category tones.">
              <div className="flex flex-wrap gap-3">
                <Badge>Neutral</Badge>
                <Badge tone="navy">Navy</Badge>
                <Badge tone="coral">Coral</Badge>
                <Badge tone="success">Approved</Badge>
                <Badge tone="error">Overdue</Badge>
                <Badge tone="funeral">Funeral</Badge>
                <Badge tone="life">Life</Badge>
                <Badge tone="savings">Savings</Badge>
                <Badge tone="accident">Accident</Badge>
              </div>
            </Spec>

            <Spec id="card" name="Card" count="3 variants" intro="Shadow, outline, flat tint.">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6"><h5>Shadow</h5><p className="mt-2 text-sm text-muted-foreground">Default surface.</p></Card>
                <Card variant="outline" className="p-6"><h5>Outline</h5><p className="mt-2 text-sm text-muted-foreground">Hairline border only.</p></Card>
                <Card variant="flat" className="p-6"><h5>Flat</h5><p className="mt-2 text-sm text-muted-foreground">Tint background.</p></Card>
              </div>
            </Spec>

            <Spec id="forms" name="Form controls" intro="Inputs, select, checkbox, radio, switch — navy focus, coral outline ring.">
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Full name" placeholder="Aina Nangolo" />
                <Input label="ID number" placeholder="00000000" hint="13 digits, no spaces." />
                <Input label="Email" placeholder="you@example.com" error="We could not verify that address." />
                <Select
                  label="Cover amount"
                  options={[
                    { value: "25000", label: "N$25,000" },
                    { value: "50000", label: "N$50,000" },
                    { value: "100000", label: "N$100,000" },
                  ]}
                />
                <div className="flex flex-col gap-3">
                  <Checkbox label="I agree to the plan terms" defaultChecked />
                  <Checkbox label="Send me a copy on WhatsApp" />
                </div>
                <div className="flex flex-col gap-3">
                  <Radio name="pay" label="Debit order" defaultChecked />
                  <Radio name="pay" label="Cash at branch" />
                  <Radio name="pay" label="Payroll deduction" />
                </div>
                <Switch label="Notify me when a claim is paid" defaultChecked />
              </div>
            </Spec>

            <Spec id="plancard" name="PlanCard" intro="Category marketing card — flat category fill, coral eyebrow and CTA, white Onest title.">
              <div className="grid gap-5 md:grid-cols-2">
                <PlanCard category="funeral" title="Protection your family can count on." cta="Compare Funeral Plans" />
                <PlanCard category="life" title="A lump sum that protects what you've built." cta="Compare Life Insurance" />
                <PlanCard category="savings" title="Grow it steadily, for the years that matter." cta="Compare Saving Plans" />
                <PlanCard category="accident" title="Cash support when the unexpected happens." cta="Compare LifeGuard" />
              </div>
            </Spec>

            <Spec id="planrow" name="PlanRow" intro="Plan list row — plain white, navy Onest, 3px category left tick.">
              <div className="rounded-lg border border-hairline bg-surface px-6">
                <PlanRow category="funeral" name="Family Plan" tagline="Ages 18-65 · Main life, spouse, children" price="From N$85/m" />
                <PlanRow category="funeral" name="Prime Plan" tagline="Ages 18-60 · N$25,000 or N$50,000 cover" price="From N$120/m" />
                <PlanRow category="life" name="OneLife Plan" tagline="Lump sum, up to N$1,000,000 cover" price="From N$240/m" />
                <PlanRow category="savings" name="Study Plan" tagline="Education-focused, matures at enrolment age" price="From N$150/m" />
              </div>
            </Spec>

            <Spec id="tabs" name="Tabs" intro="Pill tabs on a muted track.">
              <Tabs defaultValue="claims">
                <TabsList>
                  <TabsTrigger value="claims">Claims</TabsTrigger>
                  <TabsTrigger value="cover">Cover</TabsTrigger>
                  <TabsTrigger value="branches">Branches</TabsTrigger>
                </TabsList>
                <TabsContent value="claims">
                  <p className="text-sm leading-[1.6] text-muted-foreground">
                    N$1,000 Instant Cash paid the same day a funeral claim is approved.
                  </p>
                </TabsContent>
                <TabsContent value="cover">
                  <p className="text-sm leading-[1.6] text-muted-foreground">
                    Funeral plans pay a cover benefit; the OneLife Plan pays a lump sum.
                  </p>
                </TabsContent>
                <TabsContent value="branches">
                  <p className="text-sm leading-[1.6] text-muted-foreground">
                    20 branches nationwide, plus WhatsApp and the Bonlife 90 quoting app.
                  </p>
                </TabsContent>
              </Tabs>
            </Spec>

            <Spec id="accordion" name="Accordion" intro="One item open at a time.">
              <div className="rounded-lg bg-surface px-6">
                <Accordion
                  items={[
                    { id: "waiting", title: "How does the waiting period work?", content: "Full details up front — no fine print, no surprises. The waiting period is stated on your policy schedule." },
                    { id: "claim", title: "How do I claim?", content: "SMS your name to 74448 or walk into any of our 20 branches. Approved funeral claims get N$1,000 Instant Cash the same day." },
                    { id: "lapse", title: "What if I miss a premium?", content: "You are covered by a grace period. We will call and remind you before anything lapses." },
                  ]}
                />
              </div>
            </Spec>

            <Spec id="dialog" name="Dialog" intro="Modal with backdrop, escape-key, and click-outside close.">
              <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
              <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Get a call-back"
                description="Leave your number and a Bonlife advisor will call you back today."
              >
                <div className="flex flex-col gap-4">
                  <Input label="Full name" placeholder="Aina Nangolo" />
                  <Input label="Phone" placeholder="+264 …" />
                  <div className="mt-2 flex gap-3">
                    <Button onClick={() => { setDialogOpen(false); toast.success("We will call you within the hour."); }}>Request a call</Button>
                    <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  </div>
                </div>
              </Dialog>
            </Spec>

            <Spec id="toast" name="Toast" intro="Navy toast, body-text weight. Sonner under the hood.">
              <div className="flex gap-3">
                <Button onClick={() => toast("Quote saved.")}>Show toast</Button>
                <Button variant="secondary" onClick={() => toast.success("Claim approved.")}>Success</Button>
              </div>
            </Spec>

            <Spec id="tooltip" name="Tooltip" intro="Hover for detail.">
              <div className="flex gap-6">
                <Tooltip content="Sign up without medical exams"><Button variant="outline">No medicals</Button></Tooltip>
                <Tooltip content="Same-day N$1,000 on funeral claims"><Button variant="outline">Instant Cash</Button></Tooltip>
              </div>
            </Spec>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
