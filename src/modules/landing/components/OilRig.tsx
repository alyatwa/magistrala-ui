import ButtonArrow from "@/components/button-arrow";
import React from "react";

export const OilRig = () => {
  return (
    //bg-[#f6f6f6] 
    <section className="py-24  bg-white w-screen -mx-[calc((100vw-100%)/2)]  ">
     
        <div className="lg:grid lg:grid-cols-2 px-8 lg:gap-12 lg:items-start">
          {/* Video Section */}
          <div className="mb-8 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-64  sm:h-80 lg:h-96 object-cover"
              >
                <source src="/landing/oil-rig.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-light text-gray-900 leading-tight mb-6">
              TRANSFORM YOUR INDUSTRY{" "}
              <span className="text-gray-900">— THE SMART WAY</span>
            </h2>

            <p className="text-sm text-gray-700 mb-8 leading-relaxed">
              Our IoT platform helps you digitize and optimize operations across
              industries in just a few steps. From oil & gas to manufacturing,
              agriculture to smart cities — everything you need in one place.
              Monitor, analyze, and control your assets remotely to boost
              efficiency and reduce costs.
            </p>

            <ButtonArrow>Start Your IoT Journey</ButtonArrow>
          </div>
        </div>
  
    </section>
  );
};
