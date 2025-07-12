import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import ButtonArrow from "@/components/button-arrow";
import { Logo } from "@/components/shared/Logo";

export const Hero = () => {
  const navLinks = [
    { href: "#home", label: "Home" },
    // { href: "#", label: "About us" },
    { href: "#solutions", label: "Solutions" },
    { href: "#projects", label: "Projects" },
    // { href: "#", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  const featureCards = [
    {
      title: "Oil & Gas Monitoring",
      description:
        "Offshore rig monitoring, pipeline integrity, and equipment health tracking with real-time insights.",
      alt: "Oil and gas industrial monitoring",
      image: "/landing/hero/hero-oil.jpg",
    },
    {
      title: "Smart Finance Solutions",
      description: "Financial predictive analytics for operational efficiency.",
      alt: "Smart financial systems",
      image: "/landing/hero/hero-finance.jpg",
    },
    {
      title: "Industrial Equipment",
      description:
        "Heavy machinery monitoring, operational efficiency with AI-powered insights.",
      alt: "Industrial factory automation",
      image: "/landing/hero/hero-factory-morning.jpg",
    },
  ];

  const heroButtons = [
    "Smart Manufacturing",
    "Asset Tracking",
    "Predictive Analytics",
    "Industrial IoT",
    "AI Automation",
  ];

  return (
    <div
      id="home"
      className="min-h-screen w-screen -mx-[calc((100vw-100%)/2)]  relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-turbine.jpg"
          alt="BG"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Glassy Navigation Bar */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 flex items-center justify-between">
            <Logo />

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/90 px-4 py-2 rounded-3xl hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ButtonArrow
              className="border-none"
              classNameIcon="bg-[#f6f6f6]"
              icon={<IconArrowUpRight className="text-gray-800" />}
            >
              EXPLORE SOLUTIONS
            </ButtonArrow>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
              Powering the Future of IoT with{" "}
              <span className=" font-medium">Intelligent Insights</span>
            </h1>
          </div>
          {/* hero btns */}
          <div className="flex flex-wrap gap-3 justify-center">
            {heroButtons.map((buttonText, index) => (
              <Button
                key={index}
                variant="outline"
                className="bg-white/10 rounded-3xl backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                {buttonText}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Glassy Feature Cards */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 mt-32 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="backdrop-blur-md p-0 bg-black/40 border-none border-white/20 overflow-hidden group hover:bg-black/50 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex flex-row p-4">
                  <div className="relative w-full h-24 rounded-xl">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover bg-white rounded-xl"
                    />
                  </div>
                  <div className="px-6 flex flex-col justify-between">
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-xs">{card.description}</p>
                  </div>
                  <Button className="w-12 h-12 rounded-full bg-white backdrop-blur-sm border border-white/30 hover:bg-white/90">
                    <IconArrowUpRight size={28} className=" text-gray-800 " />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
