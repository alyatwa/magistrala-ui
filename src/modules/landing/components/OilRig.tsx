import ButtonArrow from "@/components/button-arrow";
import React from "react";

export const OilRig = () => {
  return (
    <section className="bg-green-50/30 py-16 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Video Section */}
          <div className="mb-8 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-green-600">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              >
                <source src="/landing/oil-rig.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:pl-8">
            <h2 className="text-4xl font-light text-gray-900 leading-tight mb-6">
              TRANSFORM YOUR INDUSTRY{" "}
              <span className="text-gray-900">— THE SMART WAY</span>
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our IoT platform helps you digitize and optimize operations across
              industries in just a few steps. From oil & gas to manufacturing,
              agriculture to smart cities — everything you need in one place.
              Monitor, analyze, and control your assets remotely to boost
              efficiency and reduce costs.
            </p>

            <ButtonArrow>Start Your IoT Journey</ButtonArrow>
          </div>
        </div>
      </div>
    </section>
  );
};
