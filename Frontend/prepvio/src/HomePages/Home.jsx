// Home.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ZigZagServices from "../HomePages/ZigZagServices";
import Header from "../HomePages/Header";
import AboutUs from "../HomePages/AboutUs";
import FAQSection from "./Faqs";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const pricingData = [
  {
    plan: "Basic",
    price: "$19",
    features: [
      "Access to all basic courses",
      "Certificate of completion",
      "Basic community support",
    ],
  },
  {
    plan: "Pro",
    price: "$49",
    features: [
      "Everything in Basic",
      "Access to all premium courses",
      "Direct instructor Q&A",
      "Advanced community support",
    ],
  },
  {
    plan: "Enterprise",
    price: "Contact Us",
    features: [
      "Everything in Pro",
      "Team accounts",
      "Dedicated account manager",
      "Custom curriculum",
    ],
  },
];

// ✅ Updated FAQs
const faqs = [
  {
    question: "How does the AI interview system work?",
    answer:
      "Our advanced AI uses natural language processing and machine learning to conduct realistic interviews, analyzing your responses for content quality, delivery style, confidence levels, and providing instant feedback on areas for improvement.",
  },
  {
    question: "Can I practice for specific companies?",
    answer:
      "Yes! We have customized interview prep for 500+ top companies including FAANG, consulting firms, startups, and Fortune 500 companies. Each program includes company-specific questions and cultural insights.",
  },
  {
    question: "What kind of feedback do I receive?",
    answer:
      "You'll get detailed performance reports including communication analysis, content evaluation, confidence assessment, suggested improvements, and personalized coaching recommendations based on your specific goals.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Absolutely! We offer a 30-day money-back guarantee if you're not completely satisfied with your experience. We're confident in our ability to help you succeed.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer flexible pricing plans starting from $29/month for basic access, with premium plans at $79/month including expert reviews, and enterprise solutions for organizations.",
  },
  {
    question: "Do you offer group or corporate training?",
    answer:
      "Yes, we provide comprehensive corporate training programs for teams and organizations, including bulk licensing, custom content, and dedicated support from our enterprise team.",
  },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const isDarkMode = false; // you can connect this with a dark mode toggle later
  const textClasses = isDarkMode ? "text-gray-300" : "text-gray-600";
  const headingClasses = isDarkMode ? "text-white" : "text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-slate-900 border border-slate-700"
    : "bg-white shadow-md border border-gray-200";

  return (
    <div className="border-b xl:border-none">
      {/* ✅ Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center rounded-3xl"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <Header />

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col space-y-3 sm:space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className=" text-3xl mt-20 sm:text-5xl lg:text-6xl font-bold leading-tight">
              Learn and <br /> Practice Without Limit
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Start your Journey, Rest Prepvio will do.
            </p>
            <div className="flex flex-row gap-4 sm:gap-6 w-fit pt-2 sm:pt-4">
              <Link
                to="/signup"
                className="bg-gray-900 text-white hover:text-black  px-6 sm:px-8 py-3 rounded-lg font-aquire font-medium w-fit hover:bg-gray-100 shadow-md transition"
              >
                Get Started
              </Link>
              <button className="bg-gray-900 text-white hover:text-black px-6 sm:px-8 py-3 rounded-lg font-aquire font-medium w-fit hover:bg-gray-100 shadow-md transition">
                Try for Free
              </button>
            </div>
          </motion.div>
        </main>
      </section>

      {/* ✅ Services */}
      <section
        id="explore"
        className="relative w-full min-h-screen bg-cover bg-center rounded-3xl flex items-center"
        style={{ backgroundImage: "url('/service.png')" }}
      >
        <div className="container mx-auto px-4 sm:px-6 dark:bg-black/50 p-6 rounded-xl">
          <ZigZagServices />
        </div>
      </section>

      {/* ✅ About */}
      <section
        id="about"
        className="relative w-full min-h-screen bg-cover bg-center rounded-3xl flex items-center"
        style={{ backgroundImage: "url('/hero section.png')" }}
      >
        <div className="container mx-auto px-4 sm:px-6 dark:bg-black/50 rounded-xl p-6">
          <AboutUs />
        </div>
      </section>

      {/* ✅ Pricing */}
      <motion.section
        className="relative w-full min-h-screen bg-cover bg-center py-16 rounded-3xl"
        style={{ backgroundImage: "url('/pricing.png')" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-aquire font-extrabold text-shadow-2xs text-gray-900 dark:text-white sm:text-4xl">
              Flexible Pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Choose the plan that's right for you and get started today.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingData.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                style={{ backgroundImage: "url('/new.png')" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.plan}
                </h3>
                <p className="mt-4 text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {plan.price}
                  {plan.price !== "Contact Us" && (
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                      /mo
                    </span>
                  )}
                </p>
                <ul className="mt-6 space-y-3 text-left">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-200">
                  {plan.price !== "Contact Us" ? "Choose Plan" : "Contact Sales"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ✅ FAQs */}
     <section
        
        className="relative w-full min-h-screen bg-cover bg-center rounded-3xl flex items-center"
        style={{ backgroundImage: "url('/faqs.png')" }}
      >
        <div className="container mx-auto px-4 sm:px-6 dark:bg-black/50 p-6 rounded-xl">
          <FAQSection />
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section
        id="contact"
        className="relative w-full rounded-3xl min-h-screen bg-cover bg-center py-16 flex items-center"
        style={{ backgroundImage: "url('/pricing.png')" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-aquire  font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.h2>
            <p className={`text-xl ${textClasses}`}>
              We’d love to hear from you! Reach out for support, collaborations,
              or inquiries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-purple-600" />
                <span className={textClasses}>support@interviewace.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-purple-600" />
                <span className={textClasses}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-purple-600" />
                <span className={textClasses}>
                  123 Tech Street, San Francisco, CA
                </span>
              </div>
            </motion.div>
            

            {/* Contact Form */}
            <motion.form
              className={`${cardClasses} p-8 rounded-2xl space-y-6`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ backgroundImage: "url('/service.png')" }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-white/50 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-white/50 transition"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-white/50 transition"
              ></textarea>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer
        className={`${
          isDarkMode ? "bg-slate-950/50" : "bg-white/80"
        } border-t ${isDarkMode ? "border-white/10" : "border-gray-200/20"} `}
        
      >
        <section
        className="relative w-full bg-cover bg-center "
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              InterviewAce
            </div>
            <p className={`mt-2 ${textClasses}`}>
              © {new Date().getFullYear()} InterviewAce. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2 rounded-full bg-purple-600/10 hover:bg-purple-600/20 transition"
              >
                <Icon className="w-5 h-5 text-purple-600" />
              </a>
            ))}
          </div>
        </div>
        </section>
      </footer>
    </div>
  );
};

export default Home;








// import React from "react";
// import { Link } from "react-router-dom";
// import ZigZagServices from "../HomePages/ZigZagServices";
// import Header from "../HomePages/Header";
// import AboutUs from "../HomePages/AboutUs";
// import { motion } from "framer-motion";
// import { CheckCircle, ChevronDown } from "lucide-react";

// const ZigZagServices = () => {
//   const [services, setServices] = React.useState([]);

//   React.useEffect(() => {
//     // Mock data for services since the backend is not available
//     const mockServices = [
//       { id: 1, title: "Mock Interviews", description: "Practice interviews with our advanced AI." },
//       { id: 2, title: "Skill Analysis", description: "Get detailed feedback on your performance." },
//       { id: 3, title: "Resume Builder", description: "Create a professional resume in minutes." }
//     ];
//     setServices(mockServices);
//   }, []);

//   const handleArrowClick = (serviceId) => {
//     console.log(`Arrow clicked for service ${serviceId}. Navigating to service page...`);
//   };

//   return (
//     <div className="flex flex-col items-center mt-20 outline-none xl:border-none bg-gradient-to-r from-blue-50 to-yellow-50 space-y-10">
//       {services.map((service, index) => (
//         <div
//           key={service.id}
//           className={`w-[90%] md:w-[70%] lg:w-[60%] flex ${
//             index % 2 === 0 ? "justify-start" : "justify-end"
//           }`}
//         >
//           <div
//             className={`w-full md:w-[80%] lg:w-[70%] bg-white  rounded-2xl shadow-xl overflow-hidden h-auto transition-transform duration-500 ${
//               index % 2 === 0 ? "md:-translate-x-10" : "md:translate-x-10"
//             }`}
//           >
//             <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-yellow-100 h-[200px] relative mt-40">
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-70 shadow-md"></div>
//             </div>

//             <div className="p-6 relative">
//               <h3 className="text-2xl font-semibold flex items-center">
//                 <span className="mr-3 text-indigo-600 font-bold text-3xl">
//                   {service.id < 10 ? `0${service.id}` : service.id}
//                 </span>
//                 {service.title}
//               </h3>
//               <p className="text-lg text-gray-600 mt-1 leading-relaxed">{service.description}</p>

//               <button
//                 onClick={() => handleArrowClick(service.id)}
//                 className="mt-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Home = () => {
//   return (
//     <div className="border-b xl:border-none bg-gradient-to-r from-blue-50 to-yellow-50">
//       <Header />

//       {/* ✅ Hero Section */}
//       <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
//         <div className="flex flex-col space-y-3 sm:space-y-4">
//           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
//             Learn and <br /> Practice Without Limit
//           </h1>
//           <p className="text-base sm:text-lg text-gray-600">
//             Start your Journey, Rest Prepvio will do.
//           </p>

//           {/* ✅ Button Container */}
//           <div className="flex flex-row gap-4 sm:gap-6 w-fit pt-2 sm:pt-4">
//             <Link
//               to="/signup"
//               className="bg-gray-900 text-white hover:text-black px-6 sm:px-8 py-3 rounded-lg font-medium w-fit hover:bg-gray-100 shadow-md transition"
//             >
//               Get Started
//             </Link>
//             <button className="bg-gray-900 text-white hover:text-black px-6 sm:px-8 py-3 rounded-lg font-medium w-fit hover:bg-gray-100 shadow-md transition">
//               Try for Free
//             </button>
//           </div>
//         </div>

//         {/* ✅ Hero Graphic */}
//         <div className="relative w-full aspect-square md:h-[500px] flex items-center justify-center">
//           <div className="absolute w-[75%] h-[75%] bg-gradient-to-br from-indigo-100 to-gray-200 rounded-[2.5rem] transform rotate-[-20deg] opacity-70"></div>
//           <div className="absolute w-[55%] h-[80%] bg-gray-300 rounded-[5rem] opacity-70"></div>
//           <div className="absolute w-[55%] h-[65%] rounded-full bg-gradient-to-bl from-blue-100 to-purple-100 opacity-60"></div>
//           <div className="absolute w-[28%] h-[45%] bg-gray-200 rounded-3xl opacity-80 bottom-0 right-0"></div>
//           <div className="absolute w-2/3 h-2/3 bg-gray-200 rounded-full opacity-60 top-0 left-0"></div>
//           <div className="absolute w-[18%] h-[18%] bg-gray-200 rounded-lg opacity-80"></div>
//           <div className="absolute w-1/4 h-1/4 bg-gray-100 rounded-full opacity-50 top-1/4 right-0"></div>
//           <div className="absolute w-1/4 h-1/4 bg-gray-100 rounded-full opacity-40 top-0 left-1/4"></div>
//         </div>
//       </main>

//       {/* ✅ Trusted Logos */}
//       <section className="mt-10 sm:mt-12 py-6 sm:py-8 container mx-auto px-4 sm:px-6">
//         <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-4 text-center">
//           Trusted by aspiring professionals at
//         </p>
//         <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
//           {["A", "B", "C", "D"].map((c, i) => (
//             <img
//               key={i}
//               src={`https://placehold.co/120x40/f3f4f6/1f2937?text=Company+${c}`}
//               alt={`Company ${c}`}
//               className="h-8 md:h-10 opacity-75 grayscale hover:grayscale-0 transition-all"
//             />
//           ))}
//         </div>
//       </section>

//       {/* ✅ Services Section */}
//       <section id="explore" className="py-10 sm:py-14 container mx-auto px-4 sm:px-6">
//         <ZigZagServices />
//       </section>

//       {/* ✅ About Us + Core Features + CTA */}
//       <section id="about" className="py-10 sm:py-14">
//         <AboutUs />
//       </section>
//     </div>
//   );
// };

// export default Home;