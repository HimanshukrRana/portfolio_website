import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <p className="inline-flex rounded-full border border-border bg-card/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-balance text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
