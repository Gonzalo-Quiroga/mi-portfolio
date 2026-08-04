import Image from "next/image";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-top relative">
      <div className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-4 px-6 py-9 sm:px-8">
        <span className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
          <Image src="/brand/gq-mark.png" alt="" width={14} height={14} className="opacity-70" />
          © {year} Gonzalo Quiroga
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
          Next.js · TypeScript · Tailwind CSS · shadcn/ui
        </span>
      </div>
    </footer>
  );
}
