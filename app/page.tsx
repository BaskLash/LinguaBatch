import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import InteractiveDemo from "./components/InteractiveDemo";
import FeatureValueSection from "./components/FeatureValueSection";
import BusinessCaseSection from "./components/BusinessCaseSection";
import VisionSection from "./components/VisionSection";
import WhyLinguaBatchSection from "./components/WhyLinguaBatchSection";
import CTASection from "./components/CTASection";
import BlogPreview from "./components/BlogPreview";
import TrackedSection from "./components/TrackedSection";

export default function Home() {
  return (
    <>
      <TrackedSection name="hero" as="div">
        <Hero />
      </TrackedSection>
      <TrackedSection name="impact" as="div">
        <ImpactSection />
      </TrackedSection>
      <TrackedSection name="problem" as="div">
        <ProblemSection />
      </TrackedSection>
      <TrackedSection name="solution" as="div">
        <SolutionSection />
      </TrackedSection>
      <TrackedSection name="interactive_demo" as="div">
        <InteractiveDemo />
      </TrackedSection>
      <TrackedSection name="feature_value" as="div">
        <FeatureValueSection />
      </TrackedSection>
      <TrackedSection name="pricing" as="div">
        <BusinessCaseSection />
      </TrackedSection>
      <TrackedSection name="vision" as="div">
        <VisionSection />
      </TrackedSection>
      <TrackedSection name="why" as="div">
        <WhyLinguaBatchSection />
      </TrackedSection>
      <TrackedSection name="blog_preview" as="div">
        <BlogPreview />
      </TrackedSection>
      <TrackedSection name="cta" as="div">
        <CTASection />
      </TrackedSection>
    </>
  );
}
