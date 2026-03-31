import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/80 py-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground md:px-8">
        <p>© {new Date().getFullYear()} {profile.firstName}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#home" className="transition hover:text-foreground">
            Back to top
          </a>
          <a href="#projects" className="transition hover:text-foreground">
            Work
          </a>
        </div>
      </div>
    </footer>
  );
}
