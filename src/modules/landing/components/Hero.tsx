import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "About us" },
    { href: "#", label: "Solution" },
    { href: "#", label: "Projects" },
    { href: "#", label: "Achievements" },
    { href: "#", label: "Contact" },
  ];

  const featureCards = [
    {
      title: "HydroAtom",
      description:
        "HydroAtom harnesses water and atomization for sustainable energy.",
      alt: "Waterfall representing hydropower",
      image: "/placeholder.svg?height=96&width=128",
    },
    {
      title: "Sunlight Energy",
      description:
        "Sunlight Energy captures solar power for clean sustainable energy.",
      alt: "Solar panels in landscape",
      image: "/placeholder.svg?height=96&width=128",
    },
    {
      title: "Wind Harvesting",
      description:
        "Wind Energy captures the wind's power to generate clean renewable energy.",
      alt: "Wind turbines in green landscape",
      image: "/placeholder.svg?height=96&width=128",
    },
  ];

  return (
    <div className="min-h-screen w-screen -mx-[calc((100vw-100%)/2)]  relative overflow-hidden">
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="text-white font-semibold text-lg">FlowGen</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all">
              EXPLORE SOLUTIONS
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Powering the Future with Sustainable{" "}
              <span className="text-green-300">Hydropower</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <Button
              variant="outline"
              className="bg-white/10 rounded-3xl backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Hydropower
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Solar Energy
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Wind Power
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Geothermal Energy
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Biomass Energy
            </Button>
          </div>
        </div>
      </div>

      {/* Glassy Feature Cards */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 mt-32 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="backdrop-blur-md bg-black/40 border border-white/20 overflow-hidden group hover:bg-black/50 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative w-full h-24">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {card.description}
                    </p>
                    <Button
                      size="icon"
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
