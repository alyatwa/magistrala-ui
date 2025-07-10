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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTag, setActiveTag] = useState("technology");

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Slider Content */}
          <div className="overflow-hidden mx-12">
            <div className="flex transition-transform duration-500 ease-in-out">
              {features.map((feature) => (
                <div key={feature.id} className="w-full flex-shrink-0 px-4">
                  <Card className="mx-auto max-w-4xl bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Content Side */}
                      <CardHeader className="p-8 space-y-6">
                        <div>
                          <Badge
                            variant="secondary"
                            className="mb-4 bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            {feature.category}
                          </Badge>
                          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {feature.title}
                          </CardTitle>
                        </div>

                        <CardDescription className="text-gray-600 text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>

                        {/* Tags */}
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {feature.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-white/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {feature.readMoreLink && (
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

                      {/* Image Side */}
                      <CardContent className="p-0">
                        <div className="h-full min-h-[300px] relative overflow-hidden rounded-lg">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Tag Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-6">
            {features.map((feature) => (
              <button
                key={feature.tagButton.id}
                onClick={() => setActiveTag(feature.tagButton.label)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTag === feature.tagButton.label
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <span className="text-xs opacity-70">
                  {feature.tagButton.id}
                </span>
                <span>{feature.tagButton.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
