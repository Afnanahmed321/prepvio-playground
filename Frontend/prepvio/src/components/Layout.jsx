import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="flex h-screen bg-cover bg-center relative "
      style={{
        backgroundImage: `url('/Hero.png')`, // 🔹 Replace with your image path
      }}
    >
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

      <div className="relative flex w-full">
        <Sidebar />

        {/* Main content with glass effect */}
        <div className="flex-1 overflow-y-auto  text-gray-900 z-10">
          <Outlet /> {/* Dashboard or other page content will render here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;



// import React from "react";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 overflow-y-auto p-6">
//         <Outlet /> {/* Dashboard or other page content will render here */}
//       </div>
//     </div>
//   );
// };

// export default Layout;
