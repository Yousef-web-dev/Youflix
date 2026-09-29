import AboutHero from "../../components/about/AboutHero";
import AboutIntro from "../../components/about/AboutIntro";
import WhyYouflix from "../../components/about/WhyYouflix";
import AboutFeatures from "../../components/about/AboutFeatures";
import TechnologyStack from "../../components/about/TechnologyStack";
import TmdbAttribution from "../../components/about/TmdbAttribution";
import HowItWorks from "../../components/about/HowItWorks";
import AboutExperience from "../../components/about/AboutExperience";
import ProjectHighlights from "../../components/about/ProjectHighlights";
import AboutCTA from "../../components/about/AboutCTA";

export const metadata = {
  title: "About Youflix | Movie & Series Discovery",
  description:
    "Learn more about Youflix, a modern movie and series discovery platform powered by TMDB.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutIntro />
      <WhyYouflix />
      <AboutFeatures />
      <TechnologyStack />
      <TmdbAttribution />
      <HowItWorks />
      <AboutExperience />
      <ProjectHighlights />
      <AboutCTA />
    </div>
  );
}
