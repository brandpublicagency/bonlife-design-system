type Row = { name: string; tagline: string; price: string };

export const marketingDefaults = {
  hero: {
    eyebrow: "For every Namibian family",
    title: "N$1,000 Instant Cash, same day.",
    lead: "A grieving family cannot wait weeks. Every Bonlife funeral plan pays a cover benefit fast, with N$1,000 Instant Cash the same day a claim is approved.",
    primaryCta: "Get a quote",
    secondaryCta: "SMS your name to 74448",
  },
  plansIntro: {
    eyebrow: "Our plans",
    title: "Find the right cover",
    note: "Click a category to see its plans below.",
    listTitle: "Available plans",
  },
  plans: {
    funeral: {
      title: "Protection your family can count on.",
      cta: "Compare Funeral Cover",
      rows: [
        { name: "Family Plan", tagline: "Ages 18-65 · Main life, spouse, children", price: "From N$85/m" },
        { name: "Prime Plan", tagline: "Ages 18-60 · N$25,000 or N$50,000 cover", price: "From N$120/m" },
        { name: "Senior Plan", tagline: "Ages 65-84 · Individual, flexible cover", price: "From N$160/m" },
        { name: "Legacy Plan", tagline: "Ages 65-84 · Bundled casket, tombstone, grocery", price: "From N$210/m" },
      ] as Row[],
    },
    life: {
      title: "A lump sum that protects what you've built.",
      cta: "Compare Life Insurance",
      rows: [
        { name: "OneLife Plan", tagline: "Lump sum, up to N$1,000,000 cover", price: "From N$240/m" },
        { name: "Cash Plan", tagline: "Smaller, flexible cash payout", price: "From N$95/m" },
      ] as Row[],
    },
    savings: {
      title: "Grow it steadily, for the years that matter.",
      cta: "Compare Saving & Study Plans",
      rows: [
        { name: "Savings Plan", tagline: "Structured savings, flexible term", price: "From N$100/m" },
        { name: "Study Plan", tagline: "Education-focused, matures at enrolment age", price: "From N$150/m" },
      ] as Row[],
    },
    accident: {
      title: "Cash support when the unexpected happens.",
      cta: "Compare Accident & Disability Cover",
      rows: [{ name: "LifeGuard Plan", tagline: "Accident and disability cash benefit", price: "From N$75/m" }] as Row[],
    },
  },
  benefits: {
    eyebrow: "Why Bonlife",
    title: "The proof points that matter.",
    items: [
      { title: "N$1,000 Instant Cash", text: "Paid the same day a funeral claim is approved. Money in hand when it matters." },
      { title: "No medicals", text: "Sign up without medical exams. Cover starts fast, paperwork stays light." },
      { title: "20 branches", text: "Real people across Namibia, plus WhatsApp and SMS." },
    ],
  },
};
