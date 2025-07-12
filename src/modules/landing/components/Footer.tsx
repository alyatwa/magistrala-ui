import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full bg-[#539f58] rounded-3xl p-8 md:p-12 text-white">
        <Logo className="flex md:hidden mb-4" />
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-4 items-start mb-12">
          <div className="flex md:flex-row flex-col gap-1 items-end">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-light">
              Let's <span className="font-normal">unite</span> to improve our{" "}
              <span className="font-normal">world</span>
            </h1>
            <Button className="mt-1 bg-white text-[#539f58] hover:bg-gray-100 rounded-full px-6 py-2 font-medium">
              GET IN TOUCH
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="text-left md:text-right space-y-2 text-sm ">
            <p>Email: contact@greenfuture.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Greenway Avenue, New</p>
            <p>York, NY 10001, USA</p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-green-100">
          <Logo className="hidden md:flex" />

          <nav className="flex flex-wrap gap-6 text-sm opacity-80">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Home
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Solution
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              About us
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Projects
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Achievements
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
