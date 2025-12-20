import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit, Loader2, Globe } from "lucide-react";

const ChannelManagement = () => {
  // --- State Management ---
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    link: ""
  });

  const API_URL = "http://localhost:8000/api/channels";

  // --- API Effects ---
  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      // Older version expected res.data directly, adjusting to standard array response
      setChannels(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      setError("Failed to fetch channels. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setCurrentEditItem(item);
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        imageUrl: item.imageUrl || "",
        link: item.link || ""
      });
    } else {
      setFormData({ name: "", description: "", imageUrl: "", link: "" });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentEditItem(null);
    setFormData({ name: "", description: "", imageUrl: "", link: "" });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.imageUrl.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setActionLoading(true);
    setError(null);

    const itemData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
      link: formData.link.trim(),
    };

    try {
      if (modalType === "add") {
        await axios.post(API_URL, itemData);
      } else {
        await axios.put(`${API_URL}/${currentEditItem._id}`, itemData);
      }
      handleCloseModal();
      await fetchChannels();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${modalType} channel`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this channel?")) {
      setActionLoading(true);
      setError(null);
      try {
        await axios.delete(`${API_URL}/${id}`);
        await fetchChannels();
      } catch (err) {
        setError("Failed to delete channel");
      } finally {
        setActionLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-rose-200 to-slate-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Channel Management</h1>
            <p className="text-slate-600 mt-1 font-medium">Manage your streaming resources and links</p>
          </div>
          <button
            onClick={() => handleOpenModal("add")}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Channel</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
            <span className="font-medium">{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 font-bold">✕</button>
          </div>
        )}

        {/* Glassy Card Container */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
          {loading && channels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-12 h-12 text-slate-500 animate-spin" />
              <p className="text-slate-600 font-semibold animate-pulse">Syncing channels...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-300/50">
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Preview</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50">
                  {channels.length > 0 ? (
                    channels.map((channel) => (
                      <tr key={channel._id} className="group hover:bg-white/30 transition-all duration-200">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <img
                            src={channel.imageUrl}
                            alt={channel.name}
                            className="h-14 w-14 rounded-2xl object-cover shadow-md border-2 border-white/80 group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                          />
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{channel.name}</span>
                            {channel.link && (
                              <a href={channel.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Visit Link
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600 max-w-md">
                          <p className="line-clamp-2">{channel.description}</p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => handleOpenModal("edit", channel)} 
                              className="p-2.5 bg-blue-100/50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all active:scale-90"
                              title="Edit Channel"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(channel._id)} 
                              className="p-2.5 bg-red-100/50 text-red-600 hover:bg-red-100 rounded-xl transition-all active:scale-90"
                              title="Delete Channel"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-20">
                        <div className="bg-slate-100/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                          <Globe className="w-10 h-10 text-slate-300" />
                        </div>
                        <p className="text-slate-500 text-lg font-medium">No channels found.</p>
                        <p className="text-slate-400 text-sm mt-1">Start by adding your first channel above!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Glassy Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-md z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 w-full max-w-lg border border-white/50 transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <h2 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">
              {modalType === "add" ? "Add New Channel" : "Edit Channel Settings"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Channel Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-2 border-slate-100 rounded-2xl p-3.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50"
                    placeholder="Enter channel title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border-2 border-slate-100 rounded-2xl p-3.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50 resize-none"
                    placeholder="Briefly describe this channel"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full border-2 border-slate-100 rounded-2xl p-3.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Original Website Link</label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full border-2 border-slate-100 rounded-2xl p-3.5 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-slate-50/50"
                    placeholder="https://channel-home.com"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={handleCloseModal} 
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200 transition-all font-bold active:scale-95"
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-bold active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {modalType === "add" ? "Create Channel" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelManagement;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
// import Modal from './Modal';

// const ChannelManagement = () => {
//   const [channels, setChannels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalType, setModalType] = useState('add');
//   const [currentEditItem, setCurrentEditItem] = useState(null);

//   const API_URL = 'http://localhost:8000/api/channels';

//   const fetchChannels = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(API_URL);
//       setChannels(res.data);
//     } catch (err) {
//       setError('Failed to fetch channels');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChannels();
//   }, []);

//   const handleOpenModal = (type, item = null) => {
//     setModalType(type);
//     setCurrentEditItem(item);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setCurrentEditItem(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const form = e.target;
//     const itemData = {
//       name: form.name.value.trim(),
//       description: form.description.value.trim(),
//       imageUrl: form.imageUrl.value.trim(),
//       link: form.link.value.trim(),
//     };

//     try {
//       if (modalType === 'add') {
//         await axios.post(API_URL, itemData);
//       } else {
//         await axios.put(`${API_URL}/${currentEditItem._id}`, itemData);
//       }
//       form.reset();
//       handleCloseModal();
//       fetchChannels();
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setError(err.response?.data?.message || `Failed to ${modalType} channel`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this channel?')) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchChannels();
//     } catch (err) {
//       setError('Failed to delete channel');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading channels...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => handleOpenModal('add')}
//           className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
//         >
//           <FaPlus />
//           <span>Add New Channel</span>
//         </button>
//       </div>
//       <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {channels.length > 0 ? (
//               channels.map(channel => (
//                 <tr key={channel._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <img
//                       src={channel.imageUrl}
//                       alt={channel.name}
//                       className="h-12 w-12 rounded-lg object-cover"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{channel.name}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{channel.description}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
//                     <button
//                       onClick={() => handleOpenModal('edit', channel)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(channel._id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">No channels found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {modalOpen && (
//         <Modal title={`${modalType === 'add' ? 'Add' : 'Edit'} Channel`} onClose={handleCloseModal}>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Channel Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 defaultValue={currentEditItem?.name || ''}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 defaultValue={currentEditItem?.description || ''}
//                 rows="3"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               ></textarea>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Image URL</label>
//               <input
//                 type="url"
//                 name="imageUrl"
//                 defaultValue={currentEditItem?.imageUrl || ''}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Original Website Link</label>
//               <input
//                 type="url"
//                 name="link"
//                 defaultValue={currentEditItem?.link || ''}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 type="button"
//                 onClick={handleCloseModal}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 {modalType === 'add' ? 'Add' : 'Update'}
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ChannelManagement;