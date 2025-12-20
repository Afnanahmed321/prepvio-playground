import React from "react";
import { Settings } from "lucide-react";

function Account() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account updated successfully ✅");
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Profile Card (Top Row) */}
      <div className="w-full bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:shadow-2xl">
        {/* Avatar */}
        <div className="w-36 h-36 flex-shrink-0">
          <img
            src="/swaroopProfile.jpg"
            alt="Profile"
            className="w-full h-full object-cover rounded-full shadow-xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Info + Buttons */}
        <div className="flex flex-col justify-center gap-2 flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Swaroop Bhati</h2>
          <p className="text-sm text-gray-700">Role: Fresher</p>
          <p className="text-xs italic text-gray-600 mb-2">Software Intern</p>
          <p className="text-gray-700 text-sm">
            Passionate about coding and building modern web apps.
          </p>

          <div className="flex justify-center md:justify-start gap-3 mt-3">
            <button className="flex items-center gap-2 bg-indigo-500/50 backdrop-blur-sm text-white font-semibold px-3 py-2 rounded-xl shadow-md hover:bg-indigo-500 hover:scale-105 transition-all duration-300">
              <Settings className="w-4 h-4" /> Edit
            </button>
            <button className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-semibold px-3 py-2 rounded-xl shadow-md hover:scale-105 hover:from-cyan-500 hover:to-indigo-600 transition-all duration-300">
              Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings Form (Bottom Row) */}
      <div className="w-full bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">
          Account Settings
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["First Name", "Enter your first name"],
              ["Last Name", "Enter your last name"],
              ["Phone Number", "Enter your phone number"],
              ["Email Address", "eg. swaroop@email.com"],
              ["City", "Enter your city"],
              ["State", "Enter your state"],
              ["Pin Code", "Enter your pincode"],
              ["Country", "Enter your country"],
            ].map(([label, placeholder], idx) => (
              <div key={idx}>
                <label className="block text-gray-700 text-lg">{label}</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-white/50 rounded-xl bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-indigo-600 text-gray-800 placeholder-gray-500 transition-all duration-300"
                  placeholder={placeholder}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-lg">Bio</label>
              <textarea
                rows={4}
                className="w-full mt-1 p-2 border border-white/50 rounded-xl bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-indigo-600 text-gray-800 placeholder-gray-500 transition-all duration-300"
                placeholder="Write about yourself..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-700/70 hover:bg-indigo-900 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Account;
