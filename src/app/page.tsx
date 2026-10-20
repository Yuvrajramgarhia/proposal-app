import Hero from "@/components/sections/Hero";
import Letter from "@/components/sections/Letter";
import Journey from "@/components/sections/Journey";
import Special from "@/components/sections/Special";
import Gallery from "@/components/sections/Gallery";
import Reasons from "@/components/sections/Reasons";
import LoveMeter from "@/components/sections/LoveMeter";
import InteractiveSky from "@/components/sections/InteractiveSky";
import Countdown from "@/components/sections/Countdown";
import Proposal from "@/components/sections/Proposal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Letter />
      <Journey />
      <Special />
      <Gallery />
      <Reasons />
      <LoveMeter />
      <InteractiveSky />
      <Countdown />
      <Proposal />
    </main>
  );
}
