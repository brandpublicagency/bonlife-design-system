import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Calendar,
  Wallet,
  Gift,
  CreditCard,
  Mail,
  CircleAlert,
  CircleCheck,
  Download,
  FileText,
  Pencil,
  Plus,
  Receipt,
  House,
  Headphones,
} from "lucide-react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import { useSiteContent, loadSitePage } from "@/hooks/use-site-content";
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
import { StatTile } from "@/components/bonlife/StatTile";
import { PolicyCard } from "@/components/bonlife/PolicyCard";
import { ActivityTimeline } from "@/components/bonlife/ActivityTimeline";
import { QuickAction } from "@/components/bonlife/QuickAction";
import { ProgressBar, StatusRing } from "@/components/bonlife/Progress";
import { EmptyState } from "@/components/bonlife/EmptyState";
import { AppNavItem, HelpCard } from "@/components/bonlife/AppNav";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components - Bonlife Design System" },
      {
        name: "description",
        content:
          "Buttons, inputs, cards, plan cards, dialogs, tooltips - every Bonlife component with live variants.",
      },
      { property: "og:title", content: "Components - Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Buttons, inputs, cards, plan cards, dialogs, tooltips - every Bonlife component with live variants.",
      },
      { property: "og:url", content: "/components" },
    ],
    links: [{ rel: "canonical", href: "/components" }],
  }),
  loader: ({ context }) => loadSitePage(context, "components"),
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
  {
    label: "Portal",
    items: [
      { id: "stattile", label: "StatTile" },
      { id: "policycard", label: "PolicyCard" },
      { id: "activitytimeline", label: "ActivityTimeline" },
      { id: "quickaction", label: "QuickAction" },
      { id: "progress", label: "Progress" },
      { id: "emptystate", label: "EmptyState" },
      { id: "appnav", label: "AppNavItem" },
    ],
  },
];

function Spec({
  id,
  name,
  count,
  lead,
  children,
}: {
  id: string;
  name: string;
  count?: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <PageSection
      id={id}
      title={name}
      lead={lead}
      headerAction={
        count ? (
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {count}
          </span>
        ) : null
      }
    >
      <div className="overflow-hidden rounded-xl border border-hairline">
        <div className="border-b border-hairline bg-surface-tint p-8 [background-image:radial-gradient(circle,rgba(12,28,62,0.06)_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="[&_*]:relative">{children}</div>
        </div>
      </div>
    </PageSection>
  );
}

function ComponentsPage() {
  const c = useSiteContent("components");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <BonlifeToaster />

      <PageHeader
        eyebrow={c.header.eyebrow}
        title={c.header.title}
        lead={c.header.lead}
      />

      <PageWithSidebar className="py-16" sidebar={<PageSidebar groups={GROUPS} />}>
        <div className="min-w-0 space-y-14">
            <PageSection id="button" title={c.sections.button.title} headerAction={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">4 variants · 3 sizes</span>} lead={c.sections.button.lead}>
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
            </PageSection>

            <PageSection id="iconbutton" title={c.sections.iconbutton.title} lead={c.sections.iconbutton.lead}>
              <div className="flex items-center gap-3">
                <IconButton aria-label="Call"><Phone size={18} /></IconButton>
                <IconButton aria-label="Chat" variant="secondary"><MessageCircle size={18} /></IconButton>
                <IconButton aria-label="Branch" variant="primary"><MapPin size={18} /></IconButton>
              </div>
            </PageSection>

            <PageSection id="badge" title={c.sections.badge.title} headerAction={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">9 tones</span>} lead={c.sections.badge.lead}>
              <div className="flex flex-wrap gap-3">
                <Badge>Neutral</Badge>
                <Badge tone="navy">Navy</Badge>
                <Badge tone="coral">Coral</Badge>
                <Badge tone="success">Approved</Badge>
                <Badge tone="error">Overdue</Badge>
                <Badge tone="funeral">Funeral Cover</Badge>
                <Badge tone="life">Life Insurance</Badge>
                <Badge tone="savings">Saving & Study Plans</Badge>
                <Badge tone="accident">Accident & Disability Cover</Badge>
              </div>
            </PageSection>

            <PageSection id="card" title={c.sections.card.title} headerAction={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">3 variants</span>} lead={c.sections.card.lead}>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6"><h5>Shadow</h5><p className="mt-2 text-sm text-muted-foreground">Default surface.</p></Card>
                <Card variant="outline" className="p-6"><h5>Outline</h5><p className="mt-2 text-sm text-muted-foreground">Hairline border only.</p></Card>
                <Card variant="flat" className="p-6"><h5>Flat</h5><p className="mt-2 text-sm text-muted-foreground">Tint background.</p></Card>
              </div>
            </PageSection>

            <PageSection id="forms" title={c.sections.forms.title} lead={c.sections.forms.lead}>
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
            </PageSection>

            <PageSection id="plancard" title={c.sections.plancard.title} lead={c.sections.plancard.lead}>
              <div className="grid gap-5 md:grid-cols-2">
                <PlanCard category="funeral" title="Protection your family can count on." cta="Compare Funeral Plans" />
                <PlanCard category="life" title="A lump sum that protects what you've built." cta="Compare Life Insurance" />
                <PlanCard category="savings" title="Grow it steadily, for the years that matter." cta="Compare Saving Plans" />
                <PlanCard category="accident" title="Cash support when the unexpected happens." cta="Compare LifeGuard" />
              </div>
            </PageSection>

            <PageSection id="planrow" title={c.sections.planrow.title} lead={c.sections.planrow.lead}>
              <div className="rounded-lg border border-hairline bg-surface px-6">
                <PlanRow category="funeral" name="Family Plan" tagline="Ages 18-65 · Main life, spouse, children" price="From N$85/m" />
                <PlanRow category="funeral" name="Prime Plan" tagline="Ages 18-60 · N$25,000 or N$50,000 cover" price="From N$120/m" />
                <PlanRow category="life" name="OneLife Plan" tagline="Lump sum, up to N$1,000,000 cover" price="From N$240/m" />
                <PlanRow category="savings" name="Study Plan" tagline="Education-focused, matures at enrolment age" price="From N$150/m" />
              </div>
            </PageSection>

            <PageSection id="tabs" title={c.sections.tabs.title} lead={c.sections.tabs.lead}>
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
            </PageSection>

            <PageSection id="accordion" title={c.sections.accordion.title} lead={c.sections.accordion.lead}>
              <div className="rounded-lg bg-surface px-6">
                <Accordion
                  items={[
                    { id: "waiting", title: "How does the waiting period work?", content: "Full details up front - no fine print, no surprises. The waiting period is stated on your policy schedule." },
                    { id: "claim", title: "How do I claim?", content: "SMS your name to 74448 or walk into any of our 20 branches. Approved funeral claims get N$1,000 Instant Cash the same day." },
                    { id: "lapse", title: "What if I miss a premium?", content: "You are covered by a grace period. We will call and remind you before anything lapses." },
                  ]}
                />
              </div>
            </PageSection>

            <PageSection id="dialog" title={c.sections.dialog.title} lead={c.sections.dialog.lead}>
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
            </PageSection>

            <PageSection id="toast" title={c.sections.toast.title} lead={c.sections.toast.lead}>
              <div className="flex gap-3">
                <Button onClick={() => toast("Quote saved.")}>Show toast</Button>
                <Button variant="secondary" onClick={() => toast.success("Claim approved.")}>Success</Button>
              </div>
            </PageSection>

            <PageSection id="tooltip" title={c.sections.tooltip.title} lead={c.sections.tooltip.lead}>
              <div className="flex gap-6">
                <Tooltip content="Sign up without medical exams"><Button variant="outline">No medicals</Button></Tooltip>
                <Tooltip content="Same-day N$1,000 on funeral claims"><Button variant="outline">Instant Cash</Button></Tooltip>
              </div>
            </PageSection>

            <div id="portal" className="scroll-mt-28 rounded-xl bg-navy p-8 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">My Bonlife</div>
              <div className="mt-2 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em]">{c.sections.portal.title}</div>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-on-inverse-muted">{c.sections.portal.lead}</p>
            </div>

            <PageSection id="stattile" title={c.sections.stattile.title} headerAction={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">2 tones</span>} lead={c.sections.stattile.lead}>
              <div className="grid gap-4 sm:grid-cols-2">
                <StatTile label="Cover benefit" value="N$ 5,000" caption="Main Life" icon={<ShieldCheck strokeWidth={1} />} />
                <StatTile label="Monthly premium" value="N$ 85.95" caption="10% online discount included" icon={<Calendar strokeWidth={1} />} />
                <StatTile label="Instant Cash" value="N$ 1,000" caption="Same day a claim is approved" icon={<Wallet strokeWidth={1} />} />
                <StatTile label="Payment due" value="N$ 85.95" tone="attention" iconTone="coral" icon={<CreditCard strokeWidth={1} />} />
              </div>
            </PageSection>

            <PageSection id="policycard" title={c.sections.policycard.title} headerAction={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">4 categories</span>} lead={c.sections.policycard.lead}>
              <div className="grid gap-5 md:grid-cols-2">
                <PolicyCard category="funeral" name="Family Plan" policyNumber="2885277FSPN" href="#policycard" figures={[{ label: "Cover benefit", value: "N$ 5,000" }, { label: "Monthly", value: "N$ 85.95" }]} />
                <PolicyCard category="life" name="OneLife Plan" policyNumber="4410392OLPN" figures={[{ label: "Lump sum", value: "N$ 250,000" }, { label: "Monthly", value: "N$ 240.00" }]} />
              </div>
            </PageSection>

            <PageSection id="activitytimeline" title={c.sections.activitytimeline.title} headerAction={<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">5 tones</span>} lead={c.sections.activitytimeline.lead}>
              <div className="max-w-md rounded-panel border border-hairline bg-surface p-6">
                <ActivityTimeline
                  items={[
                    { id: "msg", icon: <Mail strokeWidth={1} />, title: "Your policy has a payment update", meta: "New message - October 2026", tone: "coral", href: "#activitytimeline" },
                    { id: "missed", icon: <CircleAlert strokeWidth={1} />, title: "Premium not received", meta: "October 2026 - missed payment", amount: "N$ 85.95", tone: "error" },
                    { id: "start", icon: <CircleCheck strokeWidth={1} />, title: "Family Plan started", meta: "1 October 2026", tone: "success" },
                    { id: "next", icon: <Gift strokeWidth={1} />, title: "Up next: Kampala Orange Card", meta: "From your 3rd month of cover", tone: "upcoming" },
                  ]}
                />
              </div>
            </PageSection>

            <PageSection id="quickaction" title={c.sections.quickaction.title} lead={c.sections.quickaction.lead}>
              <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
                <QuickAction href="#quickaction" primary icon={<CreditCard strokeWidth={1} />} label="Pay by card" />
                <QuickAction href="#quickaction" icon={<Download strokeWidth={1} />} label="Get my certificate" />
                <QuickAction href="#quickaction" icon={<FileText strokeWidth={1} />} label="Start a claim" />
                <QuickAction href="#quickaction" icon={<Pencil strokeWidth={1} />} label="Update my details" />
                <QuickAction href="#quickaction" icon={<Plus strokeWidth={1} />} label="Add a policy" />
                <QuickAction href="#quickaction" icon={<MapPin strokeWidth={1} />} label="Find a branch" />
              </div>
            </PageSection>

            <PageSection id="progress" title={c.sections.progress.title} lead={c.sections.progress.lead}>
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm"><span className="font-semibold">Accidental death</span><span className="text-muted-foreground">Covered now</span></div>
                    <ProgressBar value={100} tone="funeral" label="Accidental death cover: active" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm"><span className="font-semibold">Natural death</span><span className="text-muted-foreground">Month 1 of 6</span></div>
                    <ProgressBar value={17} tone="coral" label="Natural death waiting period: month 1 of 6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm"><span className="font-semibold">Beneficiary allocation</span><span className="text-muted-foreground">100%</span></div>
                    <ProgressBar value={100} tone="navy" size="sm" label="Beneficiary allocation: 100%" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusRing value={1} max={3} caption="missed" label="1 of 3 missed premiums before the policy lapses" />
                  <p className="m-0 max-w-[180px] text-sm leading-[1.55]">A policy lapses after <strong>3 unpaid premiums</strong>.</p>
                </div>
              </div>
            </PageSection>

            <PageSection id="emptystate" title={c.sections.emptystate.title} lead={c.sections.emptystate.lead}>
              <div className="rounded-panel border border-hairline bg-surface p-6">
                <EmptyState
                  icon={<Receipt strokeWidth={1} />}
                  title="No online payments yet"
                  body="Paylink, branch and debit order payments are matched by Bonlife and are not listed here. Ask us for a statement to see every payment we have received."
                  actions={
                    <>
                      <Button onClick={() => toast("We'll send your statement on WhatsApp.")}><MessageCircle size={18} strokeWidth={1} /> Request a statement</Button>
                      <Button variant="outline"><Phone size={18} strokeWidth={1} /> Call us</Button>
                    </>
                  }
                />
              </div>
            </PageSection>

            <PageSection id="appnav" title={c.sections.appnav.title} lead={c.sections.appnav.lead}>
              <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                <nav aria-label="Example portal" className="flex flex-col gap-1 rounded-lg border border-hairline bg-surface p-4">
                  <AppNavItem href="#appnav" active icon={<House strokeWidth={1} />} label="Home" />
                  <AppNavItem href="#appnav" icon={<ShieldCheck strokeWidth={1} />} label="My policies" />
                  <AppNavItem href="#appnav" icon={<CreditCard strokeWidth={1} />} label="Payments" count={1} countTone="attention" countLabel="1 payment due" />
                  <AppNavItem href="#appnav" icon={<Mail strokeWidth={1} />} label="Message Centre" count={1} countLabel="1 unread" />
                  <AppNavItem href="#appnav" icon={<Gift strokeWidth={1} />} label="Kampala rewards" />
                </nav>
                <div className="self-end md:max-w-[260px]">
                  <HelpCard
                    icon={<Headphones strokeWidth={1} />}
                    action={
                      <a href="#appnav" className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white font-display text-sm font-semibold text-navy no-underline">
                        <MessageCircle size={18} strokeWidth={1} /> WhatsApp Bonlife
                      </a>
                    }
                  />
                </div>
              </div>
            </PageSection>
          </div>
      </PageWithSidebar>

      <SiteFooter />
    </div>
  );
}
