import Image from "next/image";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-4 px-6 py-9 sm:px-8">
        <span className="flex items-center gap-2 font-mono text-[11.5px] text-muted-foreground">
          <Image src="/brand/gq-mark.png" alt="" width={14} height={14} className="opacity-70" />
          © {year} Gonzalo Quiroga
        </span>
        <span className="font-mono text-[11.5px] text-muted-foreground">
          Next.js · TypeScript · Tailwind CSS · shadcn/ui
        </span>
      </div>
    </footer>
  );
}
