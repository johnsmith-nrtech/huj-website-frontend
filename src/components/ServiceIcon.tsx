import { createElement } from "react";
import { getServiceIcon } from "@/lib/serviceIcons";

/** Renders a service's lucide icon by its saved name (falls back to Briefcase). */
export default function ServiceIcon({
  name,
  size = 22,
  className,
}: {
  name: string | null | undefined;
  size?: number;
  className?: string;
}) {
  return createElement(getServiceIcon(name), { size, className, "aria-hidden": true });
}