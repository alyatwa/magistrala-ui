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
    title: "SEAMLESS DEVICE MANAGEMENT & ZERO-TOUCH PROVISIONING",
    description:
      "Transform your IoT ecosystem with comprehensive lifecycle management that streamlines device onboarding and control. Focus on innovation, not infrastructure setup with our advanced provisioning capabilities.",
    category: "DEVICE MANAGEMENT",
    tags: ["Device Management", "Provisioning", "IoT Platform", "Automation"],
    image: "/landing/slider/cargo.jpg",
    readMoreLink: "#",
    tagButton: { id: "01", label: "device management" },
  },
  {
    id: 2,
    title: "INTELLIGENT AUTOMATION WITH AI/ML POWERED INSIGHTS",
    description:
      "Advanced AI/ML engine analyzes IoT data in real-time, uncovering patterns, predicting issues, and enabling smart automated actions. Configure powerful Rules Engine triggers for optimal performance.",
    category: "AI/ML ANALYTICS",
    tags: ["AI/ML", "Automation", "Real-time Analytics", "Smart Insights"],
    image: "/landing/slider/electricity.jpg",
    readMoreLink: "#",
    tagButton: { id: "02", label: "ai/ml analytics" },
  },
  {
    id: 3,
    title: "ENTERPRISE-GRADE SECURITY & SCALABLE ARCHITECTURE",
    description:
      "End-to-end encryption, role-based access controls, and compliance-ready audit trails protect your IoT data. Cloud-native platform scales seamlessly from hundreds to millions of devices.",
    category: "SECURITY & SCALE",
    tags: ["Security", "Scalability", "Enterprise", "Compliance"],
    image: "/landing/slider/factory.jpg",
    readMoreLink: "#",
    tagButton: { id: "03", label: "security & scale" },
  },
  {
    id: 4,
    title: "WIND ENERGY MONITORING & PREDICTIVE MAINTENANCE",
    description:
      "Advanced wind energy solutions with turbine performance monitoring, predictive maintenance capabilities, and wind pattern analysis. Maximize energy efficiency with intelligent IoT insights.",
    category: "RENEWABLE ENERGY",
    tags: [
      "Wind Energy",
      "Predictive Maintenance",
      "IoT Monitoring",
      "Energy Efficiency",
    ],
    image: "/landing/slider/wind-farm.jpg",
    readMoreLink: "#",
    tagButton: { id: "04", label: "renewable energy" },
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
    }, 7000); // Change every 1 second

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
    <section className="w-screen -mx-[calc((100vw-100%)/2)] px-10 py-20 ">
      <div className=" flex gap-14 flex-col relative ">
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

          <div className="flex items-start md:flex-row flex-col justify-between gap-8">
            {/* Vertical Navigation Buttons - Left Side */}
            <div className="flex flex-row flex-wrap gap-2 items-center md:items-start justify-center md:flex-col md:space-y-4">
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
            <div className="md:max-w-[50%] w-full flex-col md:flex-row justify-end border-0 py-0 flex gap-6 ">
              {/* Image Side */}
              <div className="h-[200px] w-full md:w-[350px] relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeOut" as const }}
                    className="absolute inset-0 w-full"
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
              <div className="flex flex-col justify-between   gap-2 w-full md:max-w-2/3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeFeature.id}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="text-gray-600 w-full text-sm md:text-base leading-relaxed"
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

        <div className="flex  md:max-h-[340px] flex-col md:flex-row gap-10 md:gap-4">
          <Solutions />
          <Tech />
        </div>
      </div>
    </section>
  );
}

const Tech = () => {
  return (
    <div className="flex md:w-1/3 w-full flex-row gap-4 rounded-3xl bg-[#539f58] p-4">
      {/* text*/}
      <div className="flex flex-col justify-between w-[75%] md:w-[50%]">
        <ButtonArrow icon={<IconAccessPoint className="text-white" />}>
          Technology
        </ButtonArrow>
        <div className="flex flex-col gap-2">
          <h3 className="capitalize text-2xl font-light">AI/ML IoT Platform</h3>
          <p className="text-sm">
            Transform your IoT ecosystem with cutting-edge AI/ML technology that
            converts raw device data into actionable intelligence.
          </p>
        </div>
      </div>

      {/* image */}
      <div className=" h-[310px] w-[50%] relative overflow-hidden rounded-2xl">
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
    <div className="flex md:w-2/3 h-[340px] max-h-[340px] w-full flex-row bg-white gap-4 rounded-3xl p-4 relative      overflow-hidden">
      {/* text*/}
      <div className="flex flex-col h-full justify-between flex-1  w-[50%] ">
        <ButtonArrow
          className="bg-gray-50 border-none"
          icon={<IconCloudNetwork className="text-white " />}
        >
          Solutions
        </ButtonArrow>
        <div className="flex flex-col gap-2 text-gray-600">
          <h3 className="capitalize text-lg md:text-2xl font-light">
            Eco-Friendly IoT Solutions
          </h3>
          <p className="text-xs md:text-sm">
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
