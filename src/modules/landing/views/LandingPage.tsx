import { Footer } from "../components/Footer";
import { Report } from "../components/Report";

export const LandingPage = () => {
  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Report />
      </main>
      <Footer />
    </div>
  );
};
