import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Star, Users, Clock, Search, ArrowRight } from "lucide-react";

function LearnAndPerform() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Programming",
    "Data Science",
    "Design",
    "Networking",
    "Management",
    "Marketing",
    "Cybersecurity",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const courseName = course.name || course.title || '';
    const matchesSearch = courseName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (course.category || "Other") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-slate-100 to-blue-300 font-sans p-1 md:p-1">
      {/* Hero Section */}
      <section className="relative w-full bg-cover bg-center  overflow-hidden">
        <div
          className="relative bg-cover bg-center h-[300px] flex items-center justify-center"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dknafbwlt/image/upload/v1756976555/samples/ecommerce/leather-bag-gray.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative z-10 container mx-auto px-6 py-16 text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              YOUR PREPVIO
            </h1>
            <p className="mt-2 text-lg md:text-xl drop-shadow-md">
              IT'S NEVER TOO LATE TO DREAM BIG
            </p>

            {/* Search Bar */}
            <div className="mt-6 flex justify-center">
              <div className="flex bg-white/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4">
                <input
                  type="text"
                  placeholder="What do you want to learn..."
                  className="flex-1 px-4 py-3 text-gray-700 focus:outline-none bg-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="px-6 bg-slate-900 text-white font-semibold hover:bg-indigo-600 flex items-center transition">
                  <Search className="w-5 h-5 mr-2" /> Explore Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-6 mt-12 pb-12 min-h-[500px]">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                selectedCategory === category
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && <div className="text-center text-xl">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        {!loading && !error && filteredCourses.length === 0 && (
          <div className="text-center text-xl text-gray-500">
            No courses found.
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Glassy Course Card
const CourseCard = ({ course, navigate }) => {
  return (
    <div
      className="group flex flex-col bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full cursor-pointer"
      onClick={() => navigate(`/services/learn-and-perform/${course._id}`)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x160/25396D/ffffff?text=${course.name.substring(
                0,
                10
              )}`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <Clock className="w-12 h-12 text-slate-300" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
            {course.category || "General"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {course.name || course.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 mt-auto pt-2">
          <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">
              {course.rating ? course.rating.toFixed(1) : "0.0"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              {course.students ? course.students.toLocaleString() : "0"} students
            </span>
          </div>
        </div>

        {/* Enroll Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/services/learn-and-perform/${course._id}`);
          }}
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/30"
        >
          Enroll Now
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default LearnAndPerform;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Search, Star, Users, Clock } from "lucide-react";

// // Helper function to map level to badge color for the UI design
// const getLevelColor = (level) => {
//   if (!level) return "bg-gray-500";
  
//   switch (level.toLowerCase()) {
//     case "advanced":
//       return "bg-red-500";
//     case "intermediate":
//       return "bg-yellow-500";
//     case "beginner":
//       return "bg-green-500";
//     default:
//       return "bg-gray-500";
//   }
// };

// function LearnAndPerform() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const navigate = useNavigate();

//   // ✅ Hardcoded categories for now (backend later)
//   const categories = [
//     "All",
//     "Programming",
//     "Data Science",
//     "Design",
//     "Networking",
//     "Management",
//     "Marketing",
//     "Cybersecurity",
//   ];

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchCourses = async () => {
//       try {
//         // --- KEEPING YOUR ORIGINAL BACKEND FETCH LOGIC ---
//         const res = await axios.get("http://localhost:8000/api/courses");
//         setCourses(res.data);
//       } catch (err) {
//         console.error("Failed to load courses:", err);
//         setError("Failed to load courses. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter((course) => {
//     // Assuming your backend course object uses 'name' for the title
//     const courseName = course.name || course.title || ''; 
//     const matchesSearch = courseName
//       .toLowerCase()
//       .includes(search.toLowerCase());
      
//     // Assuming your backend course object uses 'category'
//     const matchesCategory =
//       selectedCategory === "All" ||
//       (course.category || "Other") === selectedCategory;
      
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div >
//       <section
//         className="relative w-full bg-cover bg-center rounded-3xl"
//         style={{ backgroundImage: "url('/hero section.png')" }}
//       >
//         <div
//           className="relative bg-cover bg-center h-[300px] flex items-center justify-center"
//           style={{
//             backgroundImage: `url('https://res.cloudinary.com/dknafbwlt/image/upload/v1756976555/samples/ecommerce/leather-bag-gray.jpg')`,
//           }}
//         >
//           <div className="absolute inset-0 bg-black opacity-60"></div>
//           <div className="relative z-10 container mx-auto px-6 py-16 text-white text-center">
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
//               YOUR PREPVIO
//             </h1>
//             <p className="mt-2 text-lg md:text-xl drop-shadow-md">
//               IT'S NEVER TOO LATE TO DREAM BIG
//             </p>

//             {/* SEARCH BAR - UNCHANGED */}
//             <div className="mt-6 flex justify-center">
//               <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4">
//                 <input
//                   type="text"
//                   placeholder="What do you want to learn..."
//                   className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button className="px-6 bg-gray-900 text-white font-semibold hover:bg-indigo-600 flex items-center transition">
//                   <Search className="w-5 h-5 mr-2" /> Explore Courses
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* POPULAR COURSES */}
//         <div className="container mx-auto px-6 mt-12 pb-12 min-h-[500px]">
        
//           {/* 📂 Category Buttons - UNCHANGED */}
//           <div className="flex flex-wrap justify-center gap-3 mb-10">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full transition text-sm font-medium ${
//                   selectedCategory === category
//                     ? "bg-indigo-500 text-white shadow-md"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {loading && <div className="text-center text-xl">Loading...</div>}
//           {error && <div className="text-center text-red-600">{error}</div>}
//           {!loading && !error && filteredCourses.length === 0 && (
//             <div className="text-center text-xl text-gray-500">
//               No courses found.
//             </div>
//           )}

//           {/* COURSE GRID - UPDATED UI MATCHING THE IMAGE */}
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredCourses.map((course) => (
//               <div
//                 key={course._id}
//                 className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer flex flex-col border border-white/20"
//                 onClick={() =>
//                   navigate(`/services/learn-and-perform/${course._id}`)
//                 }
//                 role="article"
//                 aria-label={`${course.name || 'Course'} by ${course.instructor || 'Anonymous Instructor'}`}
//               >
//                 {/* Image & Badges Section (Assumes course.imageUrl, course.level, course.category exist) */}
//                 <div className="relative h-48 flex-shrink-0">
//                   <img
//                     src={course.imageUrl || `https://placehold.co/400x160/25396D/ffffff?text=${course.name.substring(0, 10)}`}
//                     alt={`${course.name || 'Course'} - Learn ${course.category || 'online course'}`}
//                     loading="lazy"
//                     className="w-full h-full object-cover"
//                     onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x160/25396D/ffffff?text=${course.name.substring(0, 10)}`; }}
//                   />
//                   {/* Level Badge */}
//                   {course.level && (
//                     <span
//                       className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg ${getLevelColor(course.level)}`}
//                     >
//                       {course.level}
//                     </span>
//                   )}
//                   {/* Category Badge */}
//                   {course.category && (
//                     <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gray-800 shadow-lg">
//                       {course.category}
//                     </span>
//                   )}
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-4 flex flex-col justify-between flex-grow bg-white/5 backdrop-blur-sm">
//                   {/* Title and Instructor (Assumes course.instructor and course.instructorAvatar exist) */}
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {course.name || course.title || "Course Title Missing"}
//                   </h3>
                  
//                   <div className="flex items-center text-sm text-gray-600 mb-3">
//                     <img 
//                       src={course.instructorAvatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=20&h=20&fit=crop&crop=face"}
//                       alt={`${course.instructor || 'Anonymous Instructor'} profile picture`}
//                       loading="lazy"
//                       className="w-5 h-5 rounded-full object-cover mr-2"
//                     />
//                     <span className="text-xs">{course.instructor || "Anonymous Instructor"}</span>
//                   </div>


//                   {/* Stats Section (Assumes course.rating, course.students, course.duration exist) */}
//                   <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-3 mb-4">
//                     {/* Rating */}
//                     <div className="flex items-center" aria-label={`Rating: ${course.rating ? course.rating.toFixed(1) : '0.0'} out of 5`}>
//                       <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" aria-hidden="true" />
//                       <span>{course.rating ? course.rating.toFixed(1) : '0.0'}</span>
//                     </div>
//                     {/* Students */}
//                     <div className="flex items-center" aria-label={`${course.students ? course.students.toLocaleString() : '0'} students enrolled`}>
//                       <Users className="w-4 h-4 text-indigo-500 mr-1" aria-hidden="true" />
//                       <span>{course.students ? course.students.toLocaleString() : '0'}</span>
//                     </div>
//                     {/* Duration */}
//                     <div className="flex items-center" aria-label={`Course duration: ${course.duration || '0h 0m'}`}>
//                       <Clock className="w-4 h-4 text-gray-500 mr-1" aria-hidden="true" />
//                       <span>{course.duration || '0h 0m'}</span>
//                     </div>
//                   </div>

//                   {/* Price and Enroll Button (Assumes course.price exists) */}
//                   <div className="flex justify-between items-center pt-2 mt-auto">
//                     <p className="text-2xl font-bold text-gray-900">
//                       ${course.price?.toFixed(2) || '0.00'}
//                     </p>
//                     <button
//                       // Prevents card navigation when clicking the button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         navigate(`/services/learn-and-perform/${course._id}`);
//                       }}
//                       className="px-5 py-2 bg-gradient-to-r from-blue-500/60 to-purple-500/60 backdrop-blur-md text-white rounded-lg font-semibold hover:from-blue-600/80 hover:to-purple-600/80 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 text-sm border border-white/50"
//                       aria-label={`Enroll now in ${course.name || course.title || 'this course'}`}
//                     >
//                       Enroll Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default LearnAndPerform;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// function LearnAndPerform() {
//   const [service, setService] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchServiceAndCourses = async () => {
//       try {
//         // This is a placeholder as the backend doesn't have a /api/services route yet
//         // You would uncomment and modify this once you add that route to your Express app.
//         // const serviceRes = await axios.get('http://localhost:8000/api/services/learn-and-perform');
//         // setService(serviceRes.data);

//         // Fetch courses from the MERN backend you provided
//         const coursesRes = await axios.get('http://localhost:8000/api/courses');
//         setCourses(coursesRes.data);
//       } catch (err) {
//         console.error('Failed to load data:', err);
//         setError('Failed to load courses. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServiceAndCourses();
//   }, []);

//   return (
//     <div className="bg-white text-black min-h-screen">
      

//       <main className="container mx-auto px-6 py-12 text-center mt-8">
//         <h1 className="text-5xl lg:text-6xl font-bold mb-6">Learn & Perform</h1>
//         <p className="text-lg text-gray-800">
//           Access expertly designed courses and practice interactively.
//         </p>
//       </main>

//       <section className="container mx-auto px-6 py-12">
//         {loading && <div className="text-center text-xl">Loading...</div>}
//         {error && <div className="text-center text-red-600">{error}</div>}
//         {!loading && !error && courses.length === 0 && (
//           <div className="text-center text-xl">No courses found.</div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {courses.map(course => (
//             <div
//               key={course._id}
//               className="bg-white border rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
//             >
              
//               {course.imageUrl && (
//                 <img
//                   src={course.imageUrl}
//                   alt={course.name}
//                   className="w-15 h-15 object-contain mb-4 rounded-xl"
//                 />
//               )}
//               <h2 className="text-2xl font-bold mb-2">{course.name}</h2>
//               <p className="text-gray-600 text-md mb-6">
//                 {course.description && course.description.length > 100
//                   ? course.description.substring(0, 100) + "..."
//                   : course.description}
//               </p>
              

//               <div className="flex gap-4">
//                 <button
//                   onClick={() => {
//                     const serviceSlug = 'learn-and-perform'; 
//                     navigate(`/services/${serviceSlug}/${course._id}`);
//                   }}
//                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Start Learning
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

      
//     </div>
//   );
// }

// export default LearnAndPerform;