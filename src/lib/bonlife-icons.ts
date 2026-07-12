import { createLucideIcon } from "lucide-react";
import {
  Users,
  Crown,
  Armchair,
  Landmark,
  ShieldCheck,
  Banknote,
  PiggyBank,
  GraduationCap,
  LifeBuoy,
  FileText,
  ClipboardCheck,
  CreditCard,
  UserPlus,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  Search,
  Download,
  ChevronRight,
  ArrowRight,
  Check,
  X,
  Menu,
  Info,
  Bell,
  Calendar,
  Clock,
  Lock,
  Home,
  User,
  Settings,
  ExternalLink,
  Share2,
  Star,
  Heart,
  Plus,
  Filter,
  Globe,
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import type { IconEntry } from "@/components/bonlife/IconTile";

// Lucide doesn't ship a WhatsApp glyph — build one via createLucideIcon so it
// participates in the same stroke/draw pipeline as every other icon.
const WhatsApp = createLucideIcon("WhatsApp", [
  [
    "path",
    {
      d: "M21 11.5a8.5 8.5 0 0 1-12.83 7.32L3 20.5l1.72-5.1A8.5 8.5 0 1 1 21 11.5Z",
      key: "wa-bubble",
    },
  ],
  [
    "path",
    {
      d: "M8.5 9.5c0-.55.45-1 1-1h.7c.28 0 .53.17.62.43l.6 1.65a.65.65 0 0 1-.16.7l-.5.5a6 6 0 0 0 2.96 2.96l.5-.5a.65.65 0 0 1 .7-.16l1.65.6c.26.1.43.35.43.62v.7c0 .55-.45 1-1 1A7.5 7.5 0 0 1 8.5 9.5Z",
      key: "wa-handset",
    },
  ],
]);

export type IconGroup = {
  id: string;
  title: string;
  lead: string;
  icons: IconEntry[];
};

export const ICON_GROUPS: IconGroup[] = [
  {
    id: "funeral",
    title: "Funeral cover",
    lead: "Four funeral plans, each with its own audience — from full families to legacy beneficiaries.",
    icons: [
      { name: "family-plan", label: "Family Plan", Icon: Users },
      { name: "prime-plan", label: "Prime Plan", Icon: Crown },
      { name: "senior-plan", label: "Senior Plan", Icon: Armchair },
      { name: "legacy-plan", label: "Legacy Plan", Icon: Landmark },
    ],
  },
  {
    id: "life",
    title: "Life insurance",
    lead: "Long-term life cover and short-term cash payouts.",
    icons: [
      { name: "onelife-plan", label: "OneLife Plan", Icon: ShieldCheck },
      { name: "cash-plan", label: "Cash Plan", Icon: Banknote },
    ],
  },
  {
    id: "savings",
    title: "Savings & education plans",
    lead: "Building capital for the future — general savings and school fees.",
    icons: [
      { name: "savings-plan", label: "Savings Plan", Icon: PiggyBank },
      { name: "study-plan", label: "Study Plan", Icon: GraduationCap },
    ],
  },
  {
    id: "accident",
    title: "Accident & disability cover",
    lead: "Protection when the unexpected happens.",
    icons: [
      { name: "lifeguard-plan", label: "LifeGuard Plan", Icon: LifeBuoy },
    ],
  },
  {
    id: "actions",
    title: "Customer actions",
    lead: "Icons for the flows a customer takes across the site, app and branch touchpoints.",
    icons: [
      { name: "get-a-quote", label: "Get a quote", Icon: FileText },
      { name: "claim", label: "Claim", Icon: ClipboardCheck },
      { name: "pay-premium", label: "Pay premium", Icon: CreditCard },
      { name: "beneficiary", label: "Beneficiary", Icon: UserPlus },
      { name: "branch-locator", label: "Branch locator", Icon: MapPin },
      { name: "branch", label: "Branch", Icon: Building2 },
    ],
  },
  {
    id: "contact",
    title: "Contact & support",
    lead: "Every channel a customer can reach Bonlife on.",
    icons: [
      { name: "phone", label: "Phone", Icon: Phone },
      { name: "whatsapp", label: "WhatsApp", Icon: WhatsApp },
      { name: "sms-callback", label: "SMS callback", Icon: MessageSquare },
      { name: "email", label: "Email", Icon: Mail },
      { name: "website", label: "Website", Icon: Globe },
    ],
  },
  {
    id: "social",
    title: "Social",
    lead: "Brand-safe social glyphs for footers and share sheets.",
    icons: [
      { name: "facebook", label: "Facebook", Icon: Facebook },
      { name: "instagram", label: "Instagram", Icon: Instagram },
      { name: "linkedin", label: "LinkedIn", Icon: Linkedin },
      { name: "youtube", label: "YouTube", Icon: Youtube },
      { name: "share", label: "Share", Icon: Share2 },
    ],
  },
  {
    id: "utility",
    title: "Shared utility",
    lead: "Interface glue — used across headers, forms, buttons and confirmations.",
    icons: [
      { name: "search", label: "Search", Icon: Search },
      { name: "download", label: "Download", Icon: Download },
      { name: "chevron", label: "Chevron", Icon: ChevronRight },
      { name: "arrow-right", label: "Arrow", Icon: ArrowRight },
      { name: "check", label: "Confirmation", Icon: Check },
      { name: "close", label: "Close", Icon: X },
      { name: "menu", label: "Menu", Icon: Menu },
      { name: "info", label: "Info", Icon: Info },
      { name: "alert", label: "Notification", Icon: Bell },
      { name: "calendar", label: "Calendar", Icon: Calendar },
      { name: "clock", label: "Clock", Icon: Clock },
      { name: "lock", label: "Secure", Icon: Lock },
      { name: "home", label: "Home", Icon: Home },
      { name: "account", label: "Account", Icon: User },
      { name: "settings", label: "Settings", Icon: Settings },
      { name: "external", label: "External link", Icon: ExternalLink },
      { name: "star", label: "Star", Icon: Star },
      { name: "favourite", label: "Favourite", Icon: Heart },
      { name: "plus", label: "Add", Icon: Plus },
      { name: "filter", label: "Filter", Icon: Filter },
    ],
  },
];
