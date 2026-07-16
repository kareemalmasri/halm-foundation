import type { ComponentType, SVGProps } from "react";
import { Link } from "@/i18n/navigation";

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  id?: string;
};

export default function CardLink({
  href,
  title,
  description,
  Icon,
  id,
}: CardLinkProps) {
  return (
    <Link
      id={id}
      href={href}
      className="scroll-mt-24 flex w-full flex-none flex-col gap-4 rounded-lg bg-ivory p-6 text-ink transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/30 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="leading-relaxed text-ink/70">{description}</p>
    </Link>
  );
}
