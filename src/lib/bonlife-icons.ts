import {
  HeartHandshake,
  ShieldCheck,
  PiggyBank,
  Ambulance,
  Users,
  Sunrise,
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
  Check,
} from "lucide-react";
import type { IconEntry } from "@/components/bonlife/IconTile";

export type IconGroup = {
  id: string;
  title: string;
  lead: string;
  icons: IconEntry[];
};

export const ICON_GROUPS: IconGroup[] = [
  {
    id: "products",
    title: "Product categories",
    lead: "Mirrors the four category identifiers plus the family and retirement plans in the marketing kit.",
    icons: [
      { name: "funeral-cover", label: "Funeral cover", Icon: HeartHandshake },
      { name: "life-cover", label: "Life cover", Icon: ShieldCheck },
      { name: "savings-plan", label: "Savings plan", Icon: PiggyBank },
      { name: "accident-cover", label: "Accident cover", Icon: Ambulance },
      { name: "family-plan", label: "Family plan", Icon: Users },
      { name: "retirement", label: "Retirement", Icon: Sunrise },
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
      { name: "callback", label: "SMS callback", Icon: MessageSquare },
    ],
  },
  {
    id: "utility",
    title: "Shared utility",
    lead: "Interface glue — used across headers, forms, buttons and confirmations.",
    icons: [
      { name: "phone", label: "Phone", Icon: Phone },
      { name: "email", label: "Email", Icon: Mail },
      { name: "search", label: "Search", Icon: Search },
      { name: "download", label: "Download", Icon: Download },
      { name: "chevron", label: "Chevron", Icon: ChevronRight },
      { name: "check", label: "Confirmation", Icon: Check },
    ],
  },
];
