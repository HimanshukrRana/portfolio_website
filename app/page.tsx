import dynamic from "next/dynamic";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const HeroSection = dynamic(() => import("@/sections/hero-section"));
const AboutSection = dynamic(() => import("@/sections/about-section"));
const SkillsSection = dynamic(() => import("@/sections/skills-section"));
const ProjectsSection = dynamic(() => import("@/sections/projects-section"));
const BlogsSection = dynamic(() => import("@/sections/blogs-section"));
const ExperienceSection = dynamic(() => import("@/sections/experience-section"));
const CredentialsSection = dynamic(() => import("@/sections/credentials-section"));
const ContactSection = dynamic(() => import("@/sections/contact-section"));

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <BlogsSection />
        <div className="section-divider" />
        <ExperienceSection />
        <div className="section-divider" />
        <CredentialsSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
