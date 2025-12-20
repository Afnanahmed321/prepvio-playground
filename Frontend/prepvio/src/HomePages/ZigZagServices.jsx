import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ZigZagServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const serviceRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/services");
        setServices(res.data);
        
        // Initialize active image index for each service
        const initialIndexes = {};
        res.data.forEach((service, idx) => {
          initialIndexes[idx] = 0;
        });
        setActiveImageIndex(initialIndexes);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const intervals = services.map((service, index) => {
      if (service.images && service.images.length > 1) {
        return setInterval(() => {
          setActiveImageIndex((prev) => ({
            ...prev,
            [index]: ((prev[index] || 0) + 1) % service.images.length,
          }));
        }, 3000);
      }
      return null;
    });

    return () => {
      intervals.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [services]);

  // IntersectionObserver for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.2 }
    );

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [services]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (services.length === 0) return <div className="text-center mt-20">No services found.</div>;

  const handleNavigate = (slug) => {
    navigate(`/services/${slug}`);
  };

  return (
    <section id="services" className="py-20 md:py-24 relative">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-aquire font-extrabold text-gray-900">
          Our Services
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          A full suite of tools to guide you from start to finish.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-20 lg:space-y-28 max-w-6xl mx-auto px-4">
        {services.map((service, index) => {
          const currentImageIndex = activeImageIndex[index] || 0;
          const hasMultipleImages = service.images && service.images.length > 1;

          return (
            <div
              key={service._id}
              id={`service-${index}`}
              ref={(el) => (serviceRefs.current[index] = el)}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } transform transition-all duration-700 ${
                isVisible[`service-${index}`]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              {/* Graphic / Image (Clickable) */}
              <div
                onClick={() => handleNavigate(service.slug)}
                className="relative rounded-2xl w-full md:w-1/2 h-60 md:h-64 lg:h-72 shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-white flex items-center justify-center"
              >
                {service.images && service.images.length > 0 ? (
                  <>
                    {/* Multiple images with crossfade animation */}
                    {service.images.map((img, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={img}
                        alt={service.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          imgIdx === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                    
                    {/* Image indicators (only show if multiple images) */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        {service.images.map((_, imgIdx) => (
                          <div
                            key={imgIdx}
                            className={`rounded-full transition-all duration-300 ${
                              imgIdx === currentImageIndex
                                ? "bg-white w-6 h-2"
                                : "bg-white/50 w-2 h-2"
                            }`}
                          ></div>
                        ))}
                      </div>
                    )}
                  </>
                ) : service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : service.icon ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl text-indigo-600">{service.icon}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-lg text-indigo-400">
                      [Service Graphic {index + 1}]
                    </span>
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start text-indigo-600 mb-3 cursor-pointer">
                  <span className="text-2xl font-bold mr-2">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </span>
                  <button onClick={() => handleNavigate(service.slug)}>
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ZigZagServices;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

//  const ZigZagServices = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/services");
//         setServices(res.data);
//       } catch (err) {
//         setError("Failed to load services. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
//   if (services.length === 0) return <div className="text-center mt-20">No services found.</div>;

//   const handleArrowClick = (slug) => {
//     navigate(`/services/${slug}`);
//   };

//   return (
//     <div className="flex flex-col items-center mt-20 space-y-10">
//       {services.map((service, index) => (
//         <div key={service._id} className={`w-[90%] md:w-[70%] lg:w-[60%] flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
//           <div className={`w-full md:w-[80%] lg:w-[70%] bg-white border rounded-2xl shadow-xl overflow-hidden h-auto transition-transform duration-500 ${index % 2 === 0 ? "md:-translate-x-10" : "md:translate-x-10"}`}>
//             <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-yellow-100 h-[200px] relative mt-40">
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-70 shadow-md"></div>
//             </div>

//             <div onClick={() => handleArrowClick(service.slug)} className="p-6 relative cursor-pointer">
//               <h3 className="text-2xl font-semibold flex items-center">
//                 <span className="mr-3 text-indigo-600 font-bold text-3xl">{index < 9 ? `0${index + 1}` : index + 1}</span>
//                 {service.title}
//               </h3>
//               <p className="text-lg text-gray-600 mt-1 leading-relaxed">{service.description}</p>

//               <button onClick={() => handleArrowClick(service.slug)} className="mt-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
// export default ZigZagServices ;