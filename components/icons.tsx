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

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.7 4.4-5.5 7.5-5.5s6.1 1.8 7.5 5.5" />
    </svg>
  );
}

export function ScrollIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4.5h9A2.5 2.5 0 0 1 17.5 7v12" />
      <path d="M6 4.5A2 2 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H17.5" />
      <path d="M17.5 20a2.5 2.5 0 0 0 2.5-2.5V17h-3" />
      <path d="M8 9h6M8 12.5h6" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c1.1-3.2 3.3-4.8 5.5-4.8s4.4 1.6 5.5 4.8" />
      <circle cx="17" cy="8.5" r="2.3" />
      <path d="M15.5 14.5c1.9.4 3.3 1.9 4 4.2" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function ChiselIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5 19 19" />
      <path d="M13 5h6v6" />
      <path d="m5 19 3-8 5 5-8 3Z" />
    </svg>
  );
}

export function KnotIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="9" r="4" />
      <circle cx="15" cy="15" r="4" />
      <path d="M9 5v8M5 9h8M15 11v8M11 15h8" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v11" />
      <path d="m7.5 11 4.5 4.5 4.5-4.5" />
      <path d="M5 19.5h14" />
    </svg>
  );
}

export function PhotoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20 16.5" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5h7l5 5V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V3.5Z" />
      <path d="M13 3.5V8.5h5" />
      <path d="M9 13h6M9 16h6" />
    </svg>
  );
}

export function AudioIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 14v-4h3l4-3.5v11L7 14H4Z" />
      <path d="M15 9c1 .9 1.5 1.9 1.5 3s-.5 2.1-1.5 3" />
      <path d="M17.5 6.5c1.8 1.4 2.7 3.3 2.7 5.5s-.9 4.1-2.7 5.5" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.3-3.8-8.5s1.3-6.2 3.8-8.5Z" />
    </svg>
  );
}

// أيقونة نوع عنصر الأرشيف حسب `type`
export const ARCHIVE_TYPE_ICONS: Record<
  string,
  (props: IconProps) => React.JSX.Element
> = {
  photo: PhotoIcon,
  document: DocumentIcon,
  audio: AudioIcon,
};

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
