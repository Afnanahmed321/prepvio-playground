import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit2, Loader2, FolderOpen } from "lucide-react";

const CategoryManagement = () => {
  // --- State Management ---
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:8000/api/categories";

  // --- API Effects ---
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      // Assuming backend structure is { data: [...] } based on your first snippet
      setCategories(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch categories. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) return;

    setActionLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      
      // Reset State
      setFormData({ name: "" });
      setIsEditing(false);
      setEditId(null);
      
      // Refresh List
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while saving.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setIsEditing(true);
    setEditId(category._id); // Using MongoDB default _id
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setActionLoading(true);
      setError(null);
      try {
        await axios.delete(`${API_URL}/${id}`);
        await fetchCategories();
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete category.");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: "" });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-100 to-gray-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Glass Container */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                Category Management
              </h1>
              <p className="text-gray-600 text-sm">Organize and manage your product catalog</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md mb-8 border border-white/50">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              {isEditing ? (
                <Edit2 className="w-5 h-5 text-blue-500" />
              ) : (
                <Plus className="w-5 h-5 text-orange-500" />
              )}
              {isEditing ? "Edit Category" : "Add New Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && formData.name.trim() && !actionLoading) {
                      handleSubmit(e);
                    }
                  }}
                  className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  placeholder="e.g. Electronics, Home & Kitchen..."
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-100/50 border border-red-200 text-red-700 rounded-lg text-sm italic">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  disabled={actionLoading || !formData.name.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isEditing ? (
                    <Edit2 className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {actionLoading ? "Processing..." : isEditing ? "Update Category" : "Add Category"}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-2.5 bg-white/60 backdrop-blur-sm text-gray-800 rounded-xl hover:bg-white/80 transition-all border border-gray-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Category List */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Existing Categories</h2>
              <div className="bg-orange-100 px-4 py-1.5 rounded-full shadow-inner">
                <span className="text-sm font-bold text-orange-600">
                  {categories.length} {categories.length === 1 ? 'Total' : 'Total'}
                </span>
              </div>
            </div>
            
            {loading && categories.length === 0 ? (
              <div className="text-center py-20">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-500 animate-pulse">Fetching your data...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <FolderOpen className="w-10 h-10 text-orange-300" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No categories found.</p>
                <p className="text-gray-400 text-sm mt-1">Start by adding your first classification above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={category._id}
                    className="group bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-4 flex justify-between items-center hover:bg-white/95 transition-all shadow-sm hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg transform group-hover:rotate-6 transition-transform">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">
                          Ref: {category._id}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all shadow-sm active:scale-95"
                        title="Edit Category"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all shadow-sm active:scale-95"
                        title="Delete Category"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;





// // CategoryManagement.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({ name: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const API_URL = "http://localhost:8000/api/categories";

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(API_URL);
//       setCategories(response.data.data);
//     } catch (err) {
//       setError("Failed to fetch categories.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       if (isEditing) {
//         await axios.put(`${API_URL}/${editId}`, formData);
//       } else {
//         await axios.post(API_URL, formData);
//       }
//       setFormData({ name: "" }); // Reset form to only the name field
//       setIsEditing(false);
//       setEditId(null);
//       fetchCategories();
//     } catch (err) {
//       setError(err.response?.data?.error || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (category) => {
//     setFormData({ name: category.name }); // Set form data to only the name
//     setIsEditing(true);
//     setEditId(category._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       setLoading(true);
//       setError(null);
//       try {
//         await axios.delete(`${API_URL}/${id}`);
//         fetchCategories();
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to delete category.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Category Management</h1>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {isEditing ? "Edit Category" : "Add New Category"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : isEditing ? "Update" : "Add Category"}
//             </button>
//             {isEditing && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditId(null);
//                   setFormData({ name: "" });
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//         {error && <p className="mt-4 text-red-500">{error}</p>}
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
//         {loading && <p>Loading categories...</p>}
//         {!loading && categories.length === 0 && (
//           <p className="text-gray-500">No categories found.</p>
//         )}
//         {!loading && categories.length > 0 && (
//           <ul className="space-y-4">
//             {categories.map((category) => (
//               <li
//                 key={category._id}
//                 className="border rounded-md p-4 flex justify-between items-center"
//               >
//                 <div>
//                   <h3 className="font-semibold">{category.name}</h3>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(category)}
//                     className="text-blue-600 hover:text-blue-800"
//                     title="Edit"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(category._id)}
//                     className="text-red-600 hover:text-red-800"
//                     title="Delete"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryManagement;