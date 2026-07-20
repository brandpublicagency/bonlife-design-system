import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import { Square, Layers, Smartphone, Image as ImageIcon, Link as LinkIcon, BookOpen } from "lucide-react";
import {
  TemplateInstantCash,
  TemplateLifeCover,
  TemplateFuneralCover,
  TemplateTestimonial,
  TemplateStatStory,
  TemplateOneLifeStory,
  TemplateSmsCallback,
  TemplateBranchEvent,
  TemplatePaydayReminder,
  TemplateHowItWorksCarousel,
} from "@/components/bonlife/SocialTemplates";


export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social Templates - Bonlife Design System" },
      {
        name: "description",
        content:
          "Ready-to-use social post templates for Bonlife - feed, story and link-preview formats built on brand tokens.",
      },
      { property: "og:title", content: "Social Templates - Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Nine on-brand social post templates: claim promise, category promos, testimonials, stats, CTA and more.",
      },
      { property: "og:url", content: "/social" },
    ],
    links: [{ rel: "canonical", href: "/social" }],
  }),
  component: SocialPage,
});


function SocialPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHeader
        eyebrow="Templates · v2.4"
        title="Social post templates"
        lead="Nine on-brand layouts built from Bonlife tokens. Drop copy in, export at native resolution, ship. Every template honours the Instant Cash promise, the 74448 SMS line, and the four category colours."
      />

      <PageWithSidebar
        sidebar={
          <PageSidebar
            label="Templates"
            items={[
              { id: "feed", label: "Feed · 1:1", icon: Square },
              { id: "carousel", label: "Carousel", icon: Layers },
              { id: "story", label: "Story · 9:16", icon: Smartphone },
              { id: "portrait", label: "Portrait · 4:5", icon: ImageIcon },
              { id: "link", label: "Link · 1.91:1", icon: LinkIcon },
              { id: "usage", label: "Usage rules", icon: BookOpen },
            ]}
          />
        }
      >
        <PageSection
          id="feed"

          eyebrow="Feed · 1080 × 1080"
          title="Square templates for Instagram & Facebook"
          lead="Everyday feed posts. Lead with a single idea and let type do the work."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <TemplateInstantCash />
            <TemplateSmsCallback />
            <TemplateLifeCover />
            <TemplateFuneralCover />
            <TemplateTestimonial />
          </div>
        </PageSection>

        <PageSection
          id="carousel"
          eyebrow="Carousel · multi-slide"
          title="Instagram & LinkedIn carousels"
          lead="Story-driven, swipe-through decks built on the same SocialFrame primitives. Each panel exports individually at native ratio."
        >
          <TemplateHowItWorksCarousel />
        </PageSection>


        <PageSection
          id="story"
          eyebrow="Story · 1080 × 1920"
          title="Vertical for stories and reels"
          lead="Full-bleed photography, oversized numerals, coral accent for emphasis."
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TemplateStatStory />
            <TemplateOneLifeStory />
          </div>
        </PageSection>

        <PageSection
          id="portrait"
          eyebrow="Portrait · 1080 × 1350"
          title="Portrait for premium feed placement"
          lead="Extra height for headline + supporting tiles. Ideal for recurring campaigns."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <TemplatePaydayReminder />
          </div>
        </PageSection>

        <PageSection
          id="link"
          eyebrow="Link preview · 1200 × 628"
          title="Landscape for links & WhatsApp cards"
          lead="Split photography and message - the format most people see before they click."
        >
          <div className="grid gap-8">
            <TemplateBranchEvent />
          </div>
        </PageSection>

        <PageSection
          id="usage"
          eyebrow="Rules of the road"
          title="How to use the templates"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                k: "Always",
                items: [
                  'Use "cover benefit" - never "payout" outside OneLife.',
                  '"Lump sum" is reserved for OneLife only.',
                  "Currency is N$ with a hard space (N$45).",
                  "Every post includes the 74448 SMS lockup.",
                ],
              },
              {
                k: "Never",
                items: [
                  "No em dashes in body copy - use hyphens or full stops.",
                  "No stock imagery outside the Bonlife photography set.",
                  "Do not recolour category tags - funeral/life/savings/accident are fixed.",
                  "Do not stretch or crop the wordmark.",
                ],
              },
            ].map((col) => (
              <div key={col.k} className="rounded-2xl border border-hairline bg-surface p-6">
                <div
                  className={
                    "mb-3 inline-flex rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] " +
                    (col.k === "Always"
                      ? "bg-navy text-white"
                      : "bg-coral text-navy")
                  }
                >
                  {col.k}
                </div>
                <ul className="space-y-2 text-[14px] leading-[1.6] text-navy/85">
                  {col.items.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PageSection>
      </PageWithSidebar>

      <SiteFooter />
    </div>
  );
}
