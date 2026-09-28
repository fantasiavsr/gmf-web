import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import * as data from "../../data/exampleData";
import CaseStudies from "../../sections/landing/CaseStudies";
import Chapters from "../../sections/landing/Chapters";
import FeaturedQuote from "../../sections/landing/FeaturedQuote";
import Hero from "../../sections/landing/Hero";
import Methodology from "../../sections/landing/Methodology";
import Gallery from "../../sections/landing/Gallery";
import AboutCta from "../../sections/about/AboutCta";
import AboutResearch from "../../sections/about/AboutResearch";

if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      <Navbar title="GMF Training Center" links={data.NavLinks} />

      <Hero />

      <FeaturedQuote />

      <div className="bg-primary-black/4 dark:bg-primary-white/6">
        <Chapters />
      </div>

      <div className="bg-primary-black/4 dark:bg-primary-white/6">
        <CaseStudies />
      </div>

      {/* <Methodology /> */}

      <AboutResearch />

      <Gallery />

      <AboutCta />

      <Footer page="landing" />
    </main>
  );
}
