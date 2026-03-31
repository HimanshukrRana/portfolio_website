"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { profile } from "@/lib/data";

const roles = [profile.headline, "Frontend Specialist", "UI Engineer"];

gsap.registerPlugin(useGSAP);

function useTypingText(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = useMemo(() => words[wordIndex % words.length], [wordIndex, words]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 700);
        return;
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setWordIndex((value) => value + 1);
        return;
      }

      setDisplayText((value) =>
        isDeleting
          ? currentWord.slice(0, Math.max(value.length - 1, 0))
          : currentWord.slice(0, value.length + 1),
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentWord, displayText, isDeleting]);

  return displayText;
}

export default function HeroSection() {
  const typedRole = useTypingText(roles);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("[data-hero-badge]", {
      y: 16,
      opacity: 0,
      duration: 0.6,
    })
      .from(
        "[data-hero-title]",
        {
          y: 28,
          opacity: 0,
          duration: 0.85,
        },
        "-=0.3",
      )
      .from(
        "[data-hero-copy]",
        {
          y: 24,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.45",
      )
      .from(
        "[data-hero-cta]",
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
        },
        "-=0.45",
      )
      .from(
        "[data-hero-panel]",
        {
          x: 26,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
        },
        "-=0.5",
      )
      .from(
        "[data-kpi]",
        {
          y: 18,
          opacity: 0,
          stagger: 0.08,
          duration: 0.55,
        },
        "-=0.55",
      );

    gsap.to("[data-float-a]", {
      y: -18,
      x: 14,
      duration: 5.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to("[data-float-b]", {
      y: 16,
      x: -12,
      duration: 6.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );

    const cleanups = targets.map((element) => {
      const xTo = gsap.quickTo(element, "x", { duration: 0.22, ease: "power2.out" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.22, ease: "power2.out" });

      const handleMove = (event: MouseEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - (bounds.left + bounds.width / 2);
        const y = event.clientY - (bounds.top + bounds.height / 2);
        xTo(x * 0.18);
        yTo(y * 0.18);
      };

      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("mousemove", handleMove);
      element.addEventListener("mouseleave", handleLeave);

      return () => {
        element.removeEventListener("mousemove", handleMove);
        element.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-36 md:px-8"
    >
      <AnimatedBackground />

      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
        <div className="space-y-8">
          <p
            data-hero-badge
            className="inline-flex rounded-full border border-[#b84dff]/30 bg-[#8f00ff]/10 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-[#d6a6ff]"
          >
            Open to Frontend SDE Roles
          </p>

          <h1
            data-hero-title
            className="text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl"
          >
            {profile.firstName}
            <br />
            <span className="bg-gradient-to-r from-[#8f00ff] via-[#a83dff] to-[#c266ff] bg-clip-text text-transparent">
              {typedRole}
            </span>
            <span className="ml-1 inline-block h-[0.95em] w-[2px] animate-blink align-middle bg-[#b84dff]" />
          </h1>

          <p
            data-hero-copy
            className="max-w-2xl text-pretty text-base leading-8 text-muted-foreground md:text-lg"
          >
            Frontend Software Engineer with 3+ years of experience building
            scalable products across web and mobile. I turn product strategy into
            polished, high-performance interfaces that convert users and impress
            stakeholders.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              data-hero-cta
              data-magnetic
              href="#projects"
              className="inline-flex items-center rounded-full border border-[#b84dff]/40 bg-gradient-to-r from-[#8f00ff]/25 to-[#c266ff]/25 px-7 py-3 text-sm font-semibold transition duration-300 hover:border-[#d6a6ff]/80 hover:shadow-[0_0_32px_rgba(143,0,255,0.38)]"
            >
              View Work
            </a>
            <a
              data-hero-cta
              data-magnetic
              href="#contact"
              className="inline-flex items-center rounded-full border border-border bg-card/80 px-7 py-3 text-sm font-semibold transition duration-300 hover:border-[#b84dff]/50 hover:shadow-[0_0_24px_rgba(143,0,255,0.25)]"
            >
              Hire Me
            </a>
          </div>

          <div className="grid max-w-lg grid-cols-2 gap-3 text-sm">
            <div data-kpi className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
              <p className="text-2xl font-semibold">3+ yrs</p>
              <p className="text-muted-foreground">Product Engineering</p>
            </div>
            <div data-kpi className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
              <p className="text-2xl font-semibold">Play + App</p>
              <p className="text-muted-foreground">Production Deployments</p>
            </div>
          </div>
        </div>

        <div
          data-hero-panel
          className="relative rounded-[2rem] border border-border bg-card/60 p-6 backdrop-blur md:p-8"
        >
          <div
            data-float-a
            className="pointer-events-none absolute -left-6 -top-6 rounded-2xl border border-[#b84dff]/35 bg-[#8f00ff]/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#e2c4ff]"
          >
            AI + Ecommerce
          </div>
          <div
            data-float-b
            className="pointer-events-none absolute -bottom-6 right-4 rounded-2xl border border-[#a83dff]/35 bg-[#c266ff]/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#f1dcff]"
          >
            Mobile First UX
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8f00ff]" />
              <p className="text-sm text-muted-foreground">Available for immediate interviews</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why teams hire me</p>
              <p className="text-xl font-medium leading-relaxed text-balance">
                I execute quickly, communicate clearly, and ship interfaces that
                feel premium while meeting product and business goals.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div data-kpi className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="font-semibold">Legacy-to-modern migration</p>
                <p className="mt-1 text-muted-foreground">Flask frontend to Next.js with SEO and speed improvements.</p>
              </div>
              <div data-kpi className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="font-semibold">Production mobile shipping</p>
                <p className="mt-1 text-muted-foreground">React Native CLI app delivered to both major app stores.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 h-24 rounded-2xl border border-border bg-[linear-gradient(120deg,rgba(143,0,255,0.2),rgba(194,102,255,0.1))] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Current intent</p>
            <p className="mt-2 text-sm text-foreground">Seeking frontend/full-stack opportunities where UI craft and product thinking matter.</p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.22em] text-muted-foreground md:block"
      >
        Scroll to explore
      </a>
    </section>
  );
}
