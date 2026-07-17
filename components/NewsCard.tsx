import { NewspaperIcon } from "@/components/icons";

type NewsCardProps = {
  title: string;
  date: string;
  summary: string;
};

export default function NewsCard({ title, date, summary }: NewsCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg bg-ivory p-6 text-ink sm:flex-row sm:items-start sm:gap-6">
      <span className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-lg bg-gold/15 text-gold sm:h-20 sm:w-20">
        <NewspaperIcon className="h-8 w-8 sm:h-10 sm:w-10" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-xs font-medium text-gold">{date}</span>
        <h3 className="text-lg font-semibold text-ink sm:text-xl">{title}</h3>
        <p className="leading-relaxed text-ink/70">{summary}</p>
      </div>
    </article>
  );
}
