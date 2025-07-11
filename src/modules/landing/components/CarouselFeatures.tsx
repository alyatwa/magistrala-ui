"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ButtonArrow from "@/components/button-arrow";
import {
  IconAccessPoint,
  IconArrowUpRight,
  IconCloudNetwork,
} from "@tabler/icons-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

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

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = features.findIndex(
        (feature) => feature.tagButton.label === activeTag
      );
      const nextIndex = (currentIndex + 1) % features.length;
      setActiveTag(features[nextIndex].tagButton.label);
    }, 5000); // Change every 1 second

    return () => clearInterval(interval);
  }, [activeTag]);

  // Find the currently active feature based on the selected tag
  const activeFeature =
    features.find((feature) => feature.tagButton.label === activeTag) ||
    features[0];

  // Animation variants
  const contentVariants = {
    enter: {
      opacity: 0,
      x: 20,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -20,
    },
  };

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const transition = {
    duration: 1.2,
    ease: "easeOut" as const,
  };

  return (
    <section className="w-full py-16 ">
      <div className=" flex gap-14 flex-col relative   ">
        <div className="">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeFeature.id}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="text-2xl md:text-3xl md:w-1/3 min-h-[120px] w-full font-light mb-12 text-gray-900 leading-tight"
            >
              {activeFeature.title}
            </motion.h2>
          </AnimatePresence>

          <div className="flex items-start justify-between gap-8">
            {/* Vertical Navigation Buttons - Left Side */}
            <div className="flex flex-col space-y-4">
              {features.map((feature) => (
                <motion.button
                  key={feature.tagButton.id}
                  onClick={() => setActiveTag(feature.tagButton.label)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center py-2 px-3 rounded-3xl text-xs font-medium transition-colors ${
                    activeTag === feature.tagButton.label
                      ? "bg-[#539f58] text-white "
                      : "bg-transparent text-gray-600 hover:bg-white"
                  }`}
                >
                  <span className="capitalize text-nowrap">
                    {`${feature.tagButton.id} ${feature.tagButton.label}`}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Main Content - Right Side */}
            <div className="md:max-w-[50%] justify-end border-0 py-0 flex gap-6 ">
              {/* Image Side */}
              <div className="h-[200px] w-[350px] relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeOut" as const }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-between gap-2 max-w-2/3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeFeature.id}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="text-gray-600 w-full text-base leading-relaxed"
                  >
                    {activeFeature.description}
                  </motion.p>
                </AnimatePresence>

                <div className="flex justify-end">
                  {activeFeature.readMoreLink && (
                    <ButtonArrow>Start</ButtonArrow>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex max-h-[340px] flex-row gap-4">
          <Solutions />
          <Tech />
        </div>
      </div>
    </section>
  );
}

const Tech = () => {
  return (
    <div className="flex w-1/3 flex-row gap-4 rounded-3xl bg-[#539f58] p-4">
      {/* text*/}
      <div className="flex flex-col justify-between w-[50%]">
        <ButtonArrow icon={<IconAccessPoint className="text-white" />}>
          Technology
        </ButtonArrow>
        <div className="flex flex-col gap-2">
          <h3 className="capitalize text-2xl font-light">
            FOLI'S GREEN ENERGY
          </h3>
          <p className="text-sm">
            At Foli, we harness cutting-edge renewable energy technologies to
            power a sustainable future.
          </p>
        </div>
      </div>

      {/* image */}
      <div className=" h-[310px] w-[202px] relative overflow-hidden rounded-2xl">
        <div className="flex z-[2] absolute top-2 right-2 aspect-square h-7 w-7 items-center justify-center rounded-full bg-[#539f58]">
          <IconArrowUpRight className="text-white" />
        </div>

        <Image
          src="/landing/tech.jpg"
          alt="tech"
          fill
          className="object-cover transition-opacity duration-300"
        />
      </div>
    </div>
  );
};

const imgs = [
  "/landing/tech.jpg",
  "/landing/marque/equp.jpg",
  "/landing/marque/cr.jpg",
  "/landing/marque/wind-turbine.jpg",
];

const ImageCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit overflow-hidden rounded-2xl   bg-gray-100"
      )}
    >
      <Image src={img} alt="img" width={210} height={220} className=" " />
    </figure>
  );
};

const Solutions = () => {
  return (
    <div className="flex w-2/3 flex-1 flex-row bg-white gap-4 rounded-3xl p-4 relative  items-center justify-between overflow-hidden">
      {/* text*/}
      <div className="flex flex-col justify-between h-full w-[50%]">
        <ButtonArrow
          className="bg-gray-50 border-none"
          icon={<IconCloudNetwork className="text-white " />}
        >
          Solutions
        </ButtonArrow>
        <div className="flex flex-col gap-2 text-gray-600">
          <h3 className="capitalize text-2xl font-light">
            Eco-Friendly IoT Solutions
          </h3>
          <p className="text-sm">
            Advanced IoT solutions for smart energy management and monitoring.
            Our interconnected devices optimize performance across renewable
            energy systems for maximum efficiency.
          </p>
          <p className="text-sm"></p>
        </div>
      </div>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {imgs.map((img) => (
          <ImageCard key={img} img={img} />
        ))}
      </Marquee>
    </div>
  );
};
