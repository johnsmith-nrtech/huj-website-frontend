// Icons the admin can choose for a service card (from lucide-react).
// To offer more icons: import it here and add it to SERVICE_ICONS.
// Browse names at https://lucide.dev/icons
import {
  Activity,
  Award,
  BadgeCheck,
  BarChart3,
  Beaker,
  Bot,
  Brain,
  Briefcase,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Cloud,
  Cpu,
  Database,
  FileCheck,
  FileSearch,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Layers,
  Lightbulb,
  Lock,
  Microscope,
  Monitor,
  Network,
  Pill,
  RefreshCw,
  Rocket,
  Scale,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Activity,
  Award,
  BadgeCheck,
  BarChart3,
  Beaker,
  Bot,
  Brain,
  Briefcase,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Cloud,
  Cpu,
  Database,
  FileCheck,
  FileSearch,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Layers,
  Lightbulb,
  Lock,
  Microscope,
  Monitor,
  Network,
  Pill,
  RefreshCw,
  Rocket,
  Scale,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);

// Used when a saved icon name is missing from the list above
export const DEFAULT_SERVICE_ICON = "Briefcase";

export function getServiceIcon(name: string | null | undefined): LucideIcon {
  return (name && SERVICE_ICONS[name]) || SERVICE_ICONS[DEFAULT_SERVICE_ICON];
}

/** "FlaskConical" -> "Flask Conical" (for labels in the picker) */
export function iconLabel(name: string) {
  return name.replace(/([a-z])([A-Z0-9])/g, "$1 $2");
}