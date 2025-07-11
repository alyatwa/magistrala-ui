import CarouselFeatures from "../components/CarouselFeatures";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { OilRig } from "../components/OilRig";
import { Report } from "../components/Report";

export const LandingPage = () => {
  return (
    <div className="grid w-full overflow-hidden items-center bg-[#f6f6f6] justify-items-center min-h-screen ">
      <main className="flex flex-col container px-4">
        <Hero/>
        <CarouselFeatures />
        <OilRig />
        <Report />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
