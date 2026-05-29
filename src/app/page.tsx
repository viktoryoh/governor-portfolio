import Navbar from "../components/layout/Navbar";
import HeroSection from "../sections/hero/HeroSection";
import ImpactStats from "../sections/stats/ImpactStats";
import HorizontalProjects from "../sections/projects/HorizontalProjects";
import CinematicCursor from "../components/ui/CinematicCursor";
export default function Home() {
  return (
    <main className="bg-[#f8faf8] text-slate-900 overflow-hidden">
        <CinematicCursor />
      <Navbar />
      <HeroSection />
      <ImpactStats />
      <HorizontalProjects />
      
    </main>
  );
}