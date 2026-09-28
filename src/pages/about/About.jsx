import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import * as data from "../../data/exampleData";
import AboutCta from "../../sections/about/AboutCta";
import AboutFocus from "../../sections/about/AboutFocus";
import AboutHero from "../../sections/about/AboutHero";
import AboutResearch from "../../sections/about/AboutResearch";
import AboutStory from "../../sections/about/AboutStory";
import AboutVision from "../../sections/about/AboutVision";

export default function About() {
  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      <Navbar title="GMF Training Center" links={data.NavLinks} />

      <AboutHero />
      <AboutStory />
      <AboutFocus />
      <AboutVision />
      <AboutResearch />
      <AboutCta />

      <Footer page="landing" />
    </main>
  );
}
