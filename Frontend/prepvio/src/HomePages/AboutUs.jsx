import React from "react";

// ✅ Centralized features data
const features = [
  {
    title: "Real-Time AI Avatar",
    description:
      "Experience human-like interviews with our interactive AI avatar, making the process natural and engaging.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 10a4 4 0 01-6 0v6l5-5-5-5-6 6a6 6 0 009 5.197V21h6v-1a6 6 0 00-9-5.197z"/>
      </svg>
    ),
  },
  {
    title: "AI-Powered Analysis",
    description:
      "Our AI evaluates speech clarity, sentiment, confidence, and relevance, providing deep performance insights.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6.2a.2.2 0 01.3-.18L13 8l4-2.18a.2.2 0 01.3.18V19"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 18v-8a2 2 0 012-2h0a2 2 0 012 2v8M16 18V9.8a2 2 0 012-2h0a2 2 0 012 2v8M4 18V8a2 2 0 012-2h0a2 2 0 012 2v10"/>
      </svg>
    ),
  },
  {
    title: "Automated Report",
    description:
      "Get detailed AI-driven feedback on strengths, weaknesses, and improvement areas instantly after every session.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 12H7"/>
      </svg>
    ),
  },
];

const AboutUs = () => {
  return (
    <div >
      {/* ✅ Features Section */}
      <section id="features" className="py-12 sm:py-16 text-center fade-in container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-aquire font-bold text-gray-900 mb-3">Core Features</h2>
        <p className="mt-1 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          These are the key features that set us apart and will help you succeed in your career.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default AboutUs;
