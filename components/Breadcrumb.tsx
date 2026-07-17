import { Link } from "@/i18n/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-white/30">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-gold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
