import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const GitHubSection = lazy(() => import("@/components/GitHubSection"));
const LeetCodeSection = lazy(() => import("@/components/LeetCodeSection"));

const SectionFallback = () => (
  <div className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="glass-card rounded-2xl h-64 animate-pulse" />
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <Suspense fallback={<SectionFallback />}>
          <GitHubSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <LeetCodeSection />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
