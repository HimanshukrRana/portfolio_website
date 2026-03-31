import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ProjectsSection from "@/sections/projects-section";

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-6 pt-36 md:px-8">
        <p className="inline-flex rounded-full border border-border bg-card/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Case Studies
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Work Highlights</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A focused collection of products where I led design engineering and
          frontend architecture from concept to launch.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full border border-border px-5 py-2 text-sm transition hover:border-[#b84dff]/50 hover:text-[#b84dff]"
        >
          Back to Portfolio
        </Link>
      </section>
      <ProjectsSection />
      <Footer />
    </div>
  );
}
