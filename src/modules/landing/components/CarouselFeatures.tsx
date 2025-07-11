"use client";

import { useState } from "react";
import Image from "next/image";
import ButtonArrow from "@/components/button-arrow";
import { IconAccessPoint, IconArrowUpRight } from "@tabler/icons-react";

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
          <h2 className="text-2xl md:text-3xl md:w-1/3 w-full font-light mb-12 text-gray-900 leading-tight">
            {activeFeature.title}
          </h2>
          <div className="flex items-start justify-between gap-8">
            {/* Vertical Navigation Buttons - Left Side */}
            <div className="flex flex-col space-y-4">
              {features.map((feature) => (
                <button
                  key={feature.tagButton.id}
                  onClick={() => setActiveTag(feature.tagButton.label)}
                  className={`flex items-center py-2 px-3 rounded-3xl text-xs font-medium transition-colors ${
                    activeTag === feature.tagButton.label
                      ? "bg-green-600 text-white "
                      : "bg-transparent text-gray-600 hover:bg-white"
                  }`}
                >
                  <span className="capitalize text-nowrap">
                    {`${feature.tagButton.id} ${feature.tagButton.label}`}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Content - Right Side */}

            <div className="md:max-w-[50%] justify-end border-0 py-0 flex gap-6 ">
              {/* Image Side */}

              <div className="h-[200px] w-[350px] relative overflow-hidden rounded-2xl">
                <Image
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-between gap-2 max-w-2/3">
                <p className="text-gray-600 w-full text-base leading-relaxed">
                  {activeFeature.description}
                </p>

                <div className="flex justify-end">
                  {activeFeature.readMoreLink && (
                    <ButtonArrow>Start</ButtonArrow>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Tech />
          <Solutions />
        </div>
      </div>
    </section>
  );
}

const Tech = () => {
  return (
    <div className="flex w-1/3 flex-row gap-4 rounded-2xl bg-green-600 p-4">
      {/* text*/}
      <div className="flex flex-col justify-between">
        <ButtonArrow icon={<IconAccessPoint />}>Technology</ButtonArrow>
        <div className="flex flex-col gap-2">
          <h3 className="capitalize text-2xl font-light">
            FOLI'S GREEN ENERGY INNOVATIONS UNLEASHED WORLDWIDE
          </h3>
          <p className="text-sm">
            At Foli, we harness cutting-edge renewable energy technologies to
            power a sustainable future. Our innovative solutions, from solar
            farms to wind turbines, lead the way in eco-friendly power
            generation.
          </p>
        </div>
      </div>

      {/* image */}
      <div className="h-[400px] w-[250px] relative overflow-hidden rounded-2xl">
        <Image
          src="/landing/tech.jpg"
          alt="tech"
          fill
          className="object-cover transition-opacity duration-300"
        />
        <div className="flex top-2 right-2 aspect-square h-7 w-7 items-center justify-center rounded-full bg-green-500">
          <IconArrowUpRight className="text-white" />
        </div>
      </div>
    </div>
  );
};

const Solutions = () => {
  return (
    <div className="flex w-2/3 flex-row bg-white gap-4 rounded-2xl p-4"></div>
  );
};
