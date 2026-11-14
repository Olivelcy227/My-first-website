import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatBand from "./components/StatBand";
import Services from "./components/Services";
import CtaBand from "./components/CtaBand";
import Approach from "./components/Approach";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-[10px] focus:font-semibold focus:uppercase focus:tracking-label focus:text-ink focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-clay-400"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <StatBand />
        <Services />
        <CtaBand />
        <Approach />
        <Testimonials />
        <Team />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
