import { Footer } from "../components/Footer";
import { Report } from "../components/Report";

export const LandingPage = () => {
  return (
    <div className="grid w-full items-center justify-items-center min-h-screen ">
      <main className="flex flex-col w-full">
        <Report />
      </main>
      <Footer />
    </div>
  );
};
