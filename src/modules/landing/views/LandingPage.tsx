import CarouselFeatures from "../components/CarouselFeatures";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { OilRig } from "../components/OilRig";
import { Report } from "../components/Report";

export const LandingPage = () => {
  return (
    <div className="grid w-full items-center justify-items-center min-h-screen ">
      <main className="flex flex-col gap-4 w-full bg-white">
        <CarouselFeatures />
        <OilRig />
        <Report />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
