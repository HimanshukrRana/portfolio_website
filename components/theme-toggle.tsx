"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur transition-transform hover:scale-105"
    >
      <span className="text-foreground dark:hidden">
        <Sun size={17} />
      </span>
      <span className="hidden text-foreground dark:block">
        <Moon size={17} />
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-[#b84dff]/40" />
    </button>
  );
}
