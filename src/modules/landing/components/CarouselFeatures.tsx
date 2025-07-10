"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  readMoreLink?: string;
  tagButton: {
    id: string;
    label: string;
  };
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "FOLI'S GREEN ENERGY INNOVATIONS UNLEASHED WORLDWIDE",
    description:
      "At Foli, we harness cutting-edge renewable energy technologies to power a sustainable future. Our innovative solutions, from solar farms to wind turbines, lead the way in eco-friendly power generation.",
    category: "SUSTAINABILITY",
    tags: ["Technology", "Innovation", "Solar panels", "Windmills"],
    image: "/landing/slider/cargo.jpg",
    readMoreLink: "#",
    tagButton: { id: "01", label: "technology" },
  },
  {
    id: 2,
    title: "SMART GRID TECHNOLOGY FOR EFFICIENT ENERGY DISTRIBUTION",
    description:
      "Revolutionary smart grid solutions that optimize energy distribution and reduce waste. Our advanced monitoring systems ensure maximum efficiency across all energy networks.",
    category: "TECHNOLOGY",
    tags: ["Smart Grid", "Efficiency", "Monitoring", "Distribution"],
    image: "/landing/slider/electricity.jpg",
    readMoreLink: "#",
    tagButton: { id: "02", label: "innovation" },
  },
  {
    id: 3,
    title: "CARBON NEUTRAL OPERATIONS BY 2030",
    description:
      "Our commitment to achieving carbon neutrality through innovative processes and sustainable practices. Leading the industry transformation towards a greener future.",
    category: "ENVIRONMENT",
    tags: ["Carbon Neutral", "Sustainability", "Green Future", "Innovation"],
    image: "/landing/slider/factory.jpg",
    readMoreLink: "#",
    tagButton: { id: "03", label: "solar panels" },
  },
  {
    id: 4,
    title: "WINDMILL POWER GENERATION EXCELLENCE",
    description:
      "Advanced windmill technology that maximizes energy capture and efficiency. Our state-of-the-art wind farms provide clean, renewable energy solutions for communities worldwide.",
    category: "RENEWABLE",
    tags: ["Windmills", "Clean Energy", "Efficiency", "Power Generation"],
    image: "/landing/slider/wind-farm.jpg",
    readMoreLink: "#",
    tagButton: { id: "04", label: "windmills" },
  },
];

export default function CarouselFeatures() {
  const [activeTag, setActiveTag] = useState("technology");

  // Find the currently active feature based on the selected tag
  const activeFeature =
    features.find((feature) => feature.tagButton.label === activeTag) ||
    features[0];

  return (
    <section className="w-full py-16 bg-[#f6f6f6]">
      <div className="px-4">
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-900 leading-tight">
            {activeFeature.title}
          </h2>
          <div className="flex gap-8">
            {/* Vertical Navigation Buttons - Left Side */}
            <div className="flex flex-col space-y-4">
              {features.map((feature) => (
                <button
                  key={feature.tagButton.id}
                  onClick={() => setActiveTag(feature.tagButton.label)}
                  className={`flex items-center space-x-3 px-1 py-3 rounded-3xl text-sm font-medium transition-colors text-left ${
                    activeTag === feature.tagButton.label
                      ? "bg-green-600 text-white "
                      : "bg-white/80 text-gray-600 hover:bg-white "
                  }`}
                >
                  <span className="capitalize">
                    {feature.tagButton.id} {feature.tagButton.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Content - Right Side */}

            <Card className="bg-transparent   border-0 shadow-none">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <CardContent className="p-0">
                  <div className="h-[200px] w-[300px] relative overflow-hidden rounded-lg">
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      fill
                      className="object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </CardContent>
                {/* Content Side */}
                <CardHeader className="px-8">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {activeFeature.description}
                  </CardDescription>

                  <div className="space-y-4">
                    {activeFeature.readMoreLink && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-green-600 hover:text-green-700"
                        >
                          Read more
                        </Button>
                        <ChevronRight className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </CardHeader>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
