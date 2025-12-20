import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Columns, List } from "lucide-react";

function Channels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLandscapeMode, setIsLandscapeMode] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();

  // ✅ Slugify function for clean URLs
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // ✅ Color map for different channel themes
  const colorMap = [
    {
      ring: "ring-indigo-500",
      btn: "bg-indigo-600 hover:bg-indigo-700",
      text: "text-indigo-600",
      border: "border-indigo-200",
      bgLight: "bg-indigo-50 hover:bg-indigo-100",
    },
    {
      ring: "ring-pink-500",
      btn: "bg-pink-600 hover:bg-pink-700",
      text: "text-pink-600",
      border: "border-pink-200",
      bgLight: "bg-pink-50 hover:bg-pink-100",
    },
    {
      ring: "ring-green-500",
      btn: "bg-green-600 hover:bg-green-700",
      text: "text-green-600",
      border: "border-green-200",
      bgLight: "bg-green-50 hover:bg-green-100",
    },
    {
      ring: "ring-purple-500",
      btn: "bg-purple-600 hover:bg-purple-700",
      text: "text-purple-600",
      border: "border-purple-200",
      bgLight: "bg-purple-50 hover:bg-purple-100",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchChannels = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/channels/course/${courseId}`
        );

        if (Array.isArray(res.data)) {
          setChannels(res.data);
        } else {
          setChannels([]);
        }
      } catch (err) {
        console.error("Failed to load channels:", err);
        setError("Failed to load channels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [courseId]);

  const handleBack = () => navigate(-1);
  const handleLayoutChange = (mode) => setIsLandscapeMode(mode);

  return (
    <div >
      <section
        className="relative w-full h-screen bg-cover bg-center rounded-3xl"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
      <section className="container mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Featured Course Channels
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Discover our most popular and highly-rated course channels.
          </p>

          {/* Layout Toggle + Back Button in one row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            {/* Layout Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleLayoutChange(false)}
                className={`p-3 rounded-full transition-colors ${
                  !isLandscapeMode
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Columns className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleLayoutChange(true)}
                className={`p-3 rounded-full transition-colors ${
                  isLandscapeMode
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              &larr; Back to Courses
            </button>
          </div>
        </div>

        {/* States */}
        {loading && <div className="text-center text-xl">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        {!loading && !error && channels.length === 0 && (
          <div className="text-center text-xl text-gray-500">
            No channels assigned to this course.
          </div>
        )}

        {/* Channel Cards */}
        <div
          className={`grid gap-8 max-w-5xl mx-auto ${
            isLandscapeMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {channels.map((channel, index) => {
            const theme = colorMap[index % colorMap.length];
            return (
              <div
                key={channel._id}
                className="relative flex flex-col md:flex-row items-center p-6 bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Channel Logo */}
                {channel.imageUrl && (
                  <div
                    className={`flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md ring-4 ${theme.ring} ring-offset-4 ring-offset-gray-100`}
                  >
                    <img
                      src={channel.imageUrl}
                      alt={channel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Channel Info */}
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {channel.name}
                  </h3>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                    {channel.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() =>
                        window.open(
                          `/${slugify(channel.name)}/${channel._id}/${courseId}`,
                          "_blank"
                        )
                      }
                      className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm text-white ${theme.btn} transition-colors shadow-md`}
                    >
                      Start Learning
                    </button>
                    <a
                      href={channel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm ${theme.text} ${theme.bgLight} border ${theme.border} transition-colors`}
                    >
                      Official Channel
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      </section>
    </div>
  );
}

export default Channels;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";


// function Channels() {
//   const [channels, setChannels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   // ✅ Slugify function for clean URLs
//   const slugify = (text) =>
//     text
//       .toLowerCase()
//       .replace(/\s+/g, "-") // Replace spaces with -
//       .replace(/[^\w-]+/g, ""); // Remove special chars

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchChannels = async () => {
//       try {
//         // Fetch channels assigned to this course
//         const res = await axios.get(
//           `http://localhost:8000/api/channels/course/${courseId}`
//         );

//         if (Array.isArray(res.data)) {
//           setChannels(res.data);
//         } else {
//           setChannels([]);
//         }
//       } catch (err) {
//         console.error("Failed to load channels:", err);
//         setError("Failed to load channels. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChannels();
//   }, [courseId]);

//   const handleBack = () => navigate(-1);

//   return (
//     <div className="bg-white text-black min-h-screen">
      
//       <main className="container mx-auto px-6 py-12 text-center mt-8">
//         <h1 className="text-5xl lg:text-6xl font-bold mb-6">Course Channels</h1>
//         <p className="text-lg text-gray-800">
//           Explore channels assigned to this course.
//         </p>
//         <button
//           onClick={handleBack}
//           className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//         >
//           &larr; Back to Courses
//         </button>
//       </main>

//       <section className="container mx-auto px-6 py-12">
//         {loading && <div className="text-center text-xl">Loading...</div>}
//         {error && <div className="text-center text-red-600">{error}</div>}
//         {!loading && !error && channels.length === 0 && (
//           <div className="text-center text-xl">
//             No channels assigned to this course.
//           </div>
//         )}

//         <div className="flex flex-col gap-8">
//           {channels.map((channel) => (
//             <div
//               key={channel._id}
//               className="flex flex-col md:flex-row items-center bg-indigo-50 border border-indigo-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
//             >
//               {channel.imageUrl && (
//                 <img
//                   src={channel.imageUrl}
//                   alt={channel.name}
//                   className="w-40 h-40 md:w-56 md:h-40 object-contain rounded-xl mb-4 md:mb-0 md:mr-6"
//                 />
//               )}

//               <div className="flex-1 text-left">
//                 <h2 className="text-2xl font-bold mb-2">{channel.name}</h2>
//                 <p className="text-gray-700 mb-4">{channel.description}</p>

//                 <div className="flex items-center gap-6">
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `/${slugify(channel.name)}/${channel._id}/${courseId}`,
//                         "_blank"
//                       )
//                     }
//                     className="px-6 py-2 border border-black text-black rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     Start Learning
//                   </button>

//                   <a
//                     href={channel.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-600 underline hover:text-indigo-800"
//                   >
//                     Official Channel
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

      
//     </div>
//   );
// }

// export default Channels;