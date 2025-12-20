import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit, Loader2, BookOpen, Layers, MonitorPlay, X } from "lucide-react";

const CourseManagement = () => {
  // --- State Management ---
  const [courses, setCourses] = useState([]);
  const [channels, setChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form States
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [courseImageUrl, setCourseImageUrl] = useState("");

  const BASE_URL = "http://localhost:8000/api";

  // --- API Functions ---
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/channels`);
      setChannels(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setChannels([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchChannels();
    fetchCategories();
  }, []);

  // --- Modal Logic ---
  const openModal = (course = null) => {
    setEditingCourse(course);
    if (course) {
      setCourseName(course.name);
      setCourseDescription(course.description);
      setCourseImageUrl(course.imageUrl || "");
      setSelectedCategory(course.categoryId?._id || "");
      setSelectedChannels(course.channels?.map((ch) => ch._id) || []);
    } else {
      setCourseName("");
      setCourseDescription("");
      setCourseImageUrl("");
      setSelectedCategory("");
      setSelectedChannels([]);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCourse(null);
  };

  // --- Actions ---
  const saveCourse = async () => {
    if (!courseName.trim() || !courseDescription.trim()) {
      alert("Please fill in required fields.");
      return;
    }

    try {
      setActionLoading(true);
      const courseData = {
        name: courseName,
        description: courseDescription,
        imageUrl: courseImageUrl,
        categoryId: selectedCategory,
        channels: selectedChannels,
      };

      if (editingCourse) {
        await axios.put(`${BASE_URL}/courses/${editingCourse._id}`, courseData);
      } else {
        await axios.post(`${BASE_URL}/courses`, courseData);
      }

      fetchCourses();
      closeModal();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course.");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      setActionLoading(true);
      await axios.delete(`${BASE_URL}/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-rose-200 to-slate-300 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">Course Management</h1>
              <p className="text-slate-600 font-medium">Create and organize learning paths for your students</p>
            </div>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" />
            <span>Add Course</span>
          </button>
        </div>

        {/* Main Glassy Card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
              <p className="text-slate-600 font-bold text-lg animate-pulse tracking-tight">Loading Courses...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-300/50">
                    <th className="px-6 py-5 text-left text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Course Info</th>
                    <th className="px-6 py-5 text-left text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Category</th>
                    <th className="px-6 py-5 text-left text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Channels</th>
                    <th className="px-6 py-5 text-right text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr key={course._id} className="group hover:bg-white/30 transition-all duration-300">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            {course.imageUrl ? (
                              <img src={course.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover shadow-md border-2 border-white/50" />
                            ) : (
                              <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-slate-400" />
                              </div>
                            )}
                            <div>
                              <span className="block text-sm font-bold text-slate-800">{course.name}</span>
                              <span className="text-xs text-slate-500 line-clamp-1 max-w-xs">{course.description}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-bold text-slate-700">{course.categoryId?.name || "Uncategorized"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {course.channels?.length > 0 ? (
                              course.channels.map((ch) => (
                                <span key={ch._id} className="bg-indigo-100/50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                                  <MonitorPlay className="w-2.5 h-2.5" />
                                  {ch.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400 italic">No channels</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => openModal(course)}
                              className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all shadow-sm active:scale-90"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteCourse(course._id)}
                              className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all shadow-sm active:scale-90"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-20 text-slate-500 font-medium">
                        No courses found. Add one to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Glassy Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-md z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl p-8 md:p-12 w-full max-w-2xl border border-white/50 transform animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                {editingCourse ? "Edit Course Settings" : "Register New Course"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 font-black text-2xl transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Course Name</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Master React in 30 Days"
                    className="w-full border-2 border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border-2 border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50 font-bold"
                  >
                    <option value="">Choose a category...</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Description</label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="What will students learn in this course?"
                  rows="3"
                  className="w-full border-2 border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Course Thumbnail (URL)</label>
                <input
                  type="text"
                  value={courseImageUrl}
                  onChange={(e) => setCourseImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border-2 border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Select Active Channels</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-slate-50/50 rounded-[2rem] border-2 border-slate-100">
                  {channels.map((ch) => (
                    <label key={ch._id} className="flex items-center gap-2 group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(ch._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChannels([...selectedChannels, ch._id]);
                          } else {
                            setSelectedChannels(selectedChannels.filter((id) => id !== ch._id));
                          }
                        }}
                        className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{ch.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-[1.5rem] hover:bg-slate-200 transition-all font-bold active:scale-95"
                >
                  Discard
                </button>
                <button
                  onClick={saveCourse}
                  disabled={actionLoading}
                  className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-[1.5rem] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-bold active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
// import Modal from "./Modal";

// const CourseManagement = () => {
//   const [courses, setCourses] = useState([]);
//   const [channels, setChannels] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [courseName, setCourseName] = useState("");
//   const [courseDescription, setCourseDescription] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedChannels, setSelectedChannels] = useState([]);
//   const [courseImageUrl, setCourseImageUrl] = useState("");

//   // Fetch courses
//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/api/courses");
//       setCourses(response.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch channels (corrected)
//   // Fetch channels (corrected)
// const fetchChannels = async () => {
//   try {
//     const response = await axios.get("http://localhost:8000/api/channels");
//     console.log("Channels response:", response.data); // Debug log
    
//     // Use response.data directly, not response.data.data
//     setChannels(Array.isArray(response.data) ? response.data : []);
//   } catch (error) {
//     console.error("Error fetching channels:", error);
//     setChannels([]); // Set empty array on error
//   }
// };

//   // Fetch categories (corrected)
// const fetchCategories = async () => {
//   try {
//     const response = await axios.get("http://localhost:8000/api/categories");
//     console.log("Categories response:", response.data); // Debug log

//     // ✅ Use response.data.data instead of response.data
//     setCategories(Array.isArray(response.data.data) ? response.data.data : []);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     setCategories([]); // fallback
//   }
// };


//   useEffect(() => {
//     fetchCourses();
//     fetchChannels();
//     fetchCategories();
//   }, []);

//   // Open Modal
//   const openModal = (course = null) => {
//     setEditingCourse(course);
//     if (course) {
//       setCourseName(course.name);
//       setCourseDescription(course.description);
//       setCourseImageUrl(course.imageUrl || "");
//       setSelectedCategory(course.categoryId?._id || "");
//       // ✅ Add a safe check for `course.channels` before mapping
//       setSelectedChannels(course.channels?.map((ch) => ch._id) || []);
//     } else {
//       setCourseName("");
//       setCourseDescription("");
//       setCourseImageUrl("");
//       setSelectedCategory("");
//       setSelectedChannels([]);
//     }
//     setModalOpen(true);
//   };

//   // Save Course
//   const saveCourse = async () => {
//     try {
//       const courseData = {
//         name: courseName,
//         description: courseDescription,
//         imageUrl: courseImageUrl,
//         categoryId: selectedCategory,
//         channels: selectedChannels,
//       };

//       if (editingCourse) {
//         await axios.put(
//           `http://localhost:8000/api/courses/${editingCourse._id}`,
//           courseData
//         );
//       } else {
//         await axios.post("http://localhost:8000/api/courses", courseData);
//       }

//       fetchCourses();
//       setModalOpen(false);
//     } catch (error) {
//       console.error("Error saving course:", error);
//     }
//   };

//   // Delete Course
//   const deleteCourse = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/courses/${id}`);
//       fetchCourses();
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Course Management</h2>
//         <button
//           onClick={() => openModal()}
//           className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//         >
//           <FaPlus className="mr-2" /> Add Course
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading courses...</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                 Description
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                 Channels
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course._id} className="border-t">
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {course.name}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-500">
//                   {course.description}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-500">
//                   {course.categoryId?.name || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-500">
//                   {/* ✅ The fix: Use optional chaining to safely access 'channels' */}
//                   {course.channels?.map((ch) => ch.name).join(", ") || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <button
//                     onClick={() => openModal(course)}
//                     className="text-blue-500 hover:text-blue-700 mr-2"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => deleteCourse(course._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {modalOpen && (
//         <Modal onClose={() => setModalOpen(false)}>
//           <h3 className="text-lg font-semibold mb-4">
//             {editingCourse ? "Edit Course" : "Add Course"}
//           </h3>
//           <input
//             type="text"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             placeholder="Course Name"
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <textarea
//             value={courseDescription}
//             onChange={(e) => setCourseDescription(e.target.value)}
//             placeholder="Course Description"
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <input
//             type="text"
//             value={courseImageUrl}
//             onChange={(e) => setCourseImageUrl(e.target.value)}
//             placeholder="Course Image URL"
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full p-2 mb-2 border rounded"
//           >
//             <option value="">Select a category...</option>
//             {/* ✅ Add a safe check for the 'categories' array */}
//             {Array.isArray(categories) && categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <select
//             multiple
//             value={selectedChannels}
//             onChange={(e) =>
//               setSelectedChannels(
//                 [...e.target.selectedOptions].map((o) => o.value)
//               )
//             }
//             className="w-full p-2 mb-4 border rounded"
//           >
//             {/* ✅ Add a safe check for the 'channels' array */}
//             {Array.isArray(channels) && channels.map((ch) => (
//               <option key={ch._id} value={ch._id}>
//                 {ch.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={saveCourse}
//             className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
//           >
//             Save
//           </button>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default CourseManagement;