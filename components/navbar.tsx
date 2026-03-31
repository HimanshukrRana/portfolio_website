"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-6">
      <motion.nav
        initial={{ y: -26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 backdrop-blur-2xl md:px-4 ${
          scrolled
            ? "border-[#b84dff]/25 bg-background/86 shadow-[0_10px_50px_rgba(143,0,255,0.14)]"
            : "border-white/10 bg-background/62"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-3 py-2"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-[#8f00ff] shadow-[0_0_14px_rgba(143,0,255,0.8)]" />
            <span className="text-sm font-semibold tracking-wide md:text-base">
              {profile.firstName}.dev
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-1 rounded-xl border border-border/70 bg-card/65 p-1 md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-background/75 hover:text-foreground"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.div whileHover={{ y: -2 }}>
            <Link
              href="/work"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-background/75 hover:text-foreground"
            >
              Work
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/work"
            className="hidden rounded-full border border-[#b84dff]/40 bg-gradient-to-r from-[#8f00ff]/20 to-[#c266ff]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e5ccff] transition hover:border-[#d6a6ff]/70 hover:shadow-[0_0_24px_rgba(143,0,255,0.35)] lg:inline-flex"
          >
            Hire Ready
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 md:hidden"
          >
            <motion.span
              animate={open ? "open" : "closed"}
              className="relative h-4 w-5"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
                className="absolute left-0 top-0 h-0.5 w-full bg-foreground"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="absolute left-0 top-1.5 h-0.5 w-full bg-foreground"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
                className="absolute left-0 top-3 h-0.5 w-full bg-foreground"
              />
            </motion.span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-[#b84dff]/25 bg-background/95 p-4 shadow-[0_14px_44px_rgba(143,0,255,0.2)] backdrop-blur-xl md:hidden"
          >
            <div className="mb-3 rounded-xl border border-border/70 bg-card/70 px-3 py-2">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {profile.headline}
              </p>
              <p className="mt-1 text-sm font-medium">{profile.location}</p>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-[#b84dff]/30 hover:bg-card/75 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/work"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-[#b84dff]/30 hover:bg-card/75 hover:text-foreground"
              >
                Work
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
