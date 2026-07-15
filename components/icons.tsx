import type { SVGProps } from "react";
import type { NavSection } from "@/components/nav-sections";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5c0-.83-.67-1.5-1.5-1.5H12v16h6.5c.83 0 1.5-.67 1.5-1.5v-13Z" />
    </svg>
  );
}

export function HammerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m14.5 6.5 3-3 3 3-3 3" />
      <path d="m12.5 8.5 5 5" />
      <path d="M4 20 14 10l2 2L6 22Z" />
      <path d="m11.5 5.5 3 3" />
    </svg>
  );
}

export function ArchiveIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4" width="17" height="4.5" rx="1" />
      <path d="M4.5 8.5V19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V8.5" />
      <path d="M10 13h4" />
    </svg>
  );
}

export function NewspaperIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5H15v13.5A1.5 1.5 0 0 1 13.5 20h-8A1.5 1.5 0 0 1 4 18.5v-12Z" />
      <path d="M15 8h3.5A1.5 1.5 0 0 1 20 9.5v9a1.5 1.5 0 0 1-1.5 1.5H13.5" />
      <path d="M7 9h4M7 12h4M7 15h4" />
    </svg>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.8 8.2h-1.4c-.7 0-1.2.5-1.2 1.2V11h2.5l-.3 2.2h-2.2V19h-2.2v-5.8H9v-2.2h1v-1.5c0-1.7 1.1-2.8 2.7-2.8h1.1v1.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.2 7.2h.01" strokeWidth={2.4} />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export const SECTION_ICONS: Record<
  NavSection,
  (props: IconProps) => React.JSX.Element
> = {
  home: HomeIcon,
  about: BookIcon,
  training: HammerIcon,
  memory: ArchiveIcon,
  news: NewspaperIcon,
  contact: EnvelopeIcon,
};
