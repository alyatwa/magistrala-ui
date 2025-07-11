export const Report = () => {
  return (
    <div className="relative flex items-center justify-start w-screen -mx-[calc((100vw-100%)/2)] px-10 py-8">
      {/* Background layer with transform */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/landing/report-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          transform: "scaleX(-1) scaleY(-1)",
        }}
      />

      {/* Report Card */}
      <div className="relative z-10 bg-white bg-opacity-95 rounded-3xl p-8 max-w-[380px] w-full shadow-2xl">
        {/* Header with logo and year */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">✕</span>
            </div>
            <span className="text-gray-800 font-medium">Impact</span>
          </div>
          <div className="bg-white border-2 border-green-600 rounded-full px-4 py-1">
            <span className="text-green-600 font-medium">2025</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl font-light text-gray-900 mb-8 leading-tight">
          Our Studio's
          <br />
          2025 Impact
          <br />
          Report
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg mb-6">
          A look back at the difference we've made together this year.
        </p>

        {/* Progress indicator */}
        <div className="flex gap-2">
          <div className="h-1 w-8 bg-green-600 rounded"></div>
          <div className="h-1 w-8 bg-gray-300 rounded"></div>
          <div className="h-1 w-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
