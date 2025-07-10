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

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  readMoreLink?: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "FOLI'S GREEN ENERGY INNOVATIONS UNLEASHED WORLDWIDE",
    description:
      "At Foli, we harness cutting-edge renewable energy technologies to power a sustainable future. Our innovative solutions, from solar farms to wind turbines, lead the way in eco-friendly power generation.",
    category: "SUSTAINABILITY",
    tags: ["Technology", "Innovation", "Solar panels", "Windmills"],
    image: "/api/placeholder/400/250",
    readMoreLink: "#",
  },
  {
    id: 2,
    title: "SMART GRID TECHNOLOGY FOR EFFICIENT ENERGY DISTRIBUTION",
    description:
      "Revolutionary smart grid solutions that optimize energy distribution and reduce waste. Our advanced monitoring systems ensure maximum efficiency across all energy networks.",
    category: "TECHNOLOGY",
    tags: ["Smart Grid", "Efficiency", "Monitoring", "Distribution"],
    image: "/api/placeholder/400/250",
    readMoreLink: "#",
  },
  {
    id: 3,
    title: "CARBON NEUTRAL OPERATIONS BY 2030",
    description:
      "Our commitment to achieving carbon neutrality through innovative processes and sustainable practices. Leading the industry transformation towards a greener future.",
    category: "ENVIRONMENT",
    tags: ["Carbon Neutral", "Sustainability", "Green Future", "Innovation"],
    image: "/api/placeholder/400/250",
    readMoreLink: "#",
  },
];

export default function CarouselFeatures() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Slider Content */}
          <div className="overflow-hidden mx-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
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
                        <div className="h-full min-h-[300px] relative overflow-hidden rounded-r-lg">
                          <img
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

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-green-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
