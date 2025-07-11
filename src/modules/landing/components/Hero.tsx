import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
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
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                About us
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Solution
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Achievements
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors"
              >
                Contact
              </a>
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
        <div className="grid gap-6 max-w-4xl">
          {/* HydroAtom Card */}
          <Card className="backdrop-blur-md bg-black/40 border border-white/20 overflow-hidden group hover:bg-black/50 transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=96&width=128"
                    alt="Waterfall representing hydropower"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    HydroAtom
                  </h3>
                  <p className="text-white/80 text-sm">
                    HydroAtom harnesses water and{" "}
                    <span className="text-white/60">atomization</span>
                    <br />
                    for{" "}
                    <span className="text-white/60">sustainable energy.</span>
                  </p>
                </div>
                <div className="p-6">
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

          {/* Sunlight Energy Card */}
          <Card className="backdrop-blur-md bg-black/40 border border-white/20 overflow-hidden group hover:bg-black/50 transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=96&width=128"
                    alt="Solar panels in landscape"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Sunlight Energy
                  </h3>
                  <p className="text-white/80 text-sm">
                    Sunlight Energy{" "}
                    <span className="text-white/60">captures</span>
                    <br />
                    <span className="text-white/60">solar power</span> for clean
                    <br />
                    <span className="text-white/60">sustainable energy.</span>
                  </p>
                </div>
                <div className="p-6">
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

          {/* Wind Harvesting Card */}
          <Card className="backdrop-blur-md bg-black/40 border border-white/20 overflow-hidden group hover:bg-black/50 transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=96&width=128"
                    alt="Wind turbines in green landscape"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Wind Harvesting
                  </h3>
                  <p className="text-white/80 text-sm">
                    Wind Energy{" "}
                    <span className="text-white/60">captures the</span>
                    <br />
                    <span className="text-white/60">wind's power</span> to
                    generate
                    <br />
                    <span className="text-white/60">
                      clean renewable energy.
                    </span>
                  </p>
                </div>
                <div className="p-6">
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
        </div>
      </div>
    </div>
  );
};
