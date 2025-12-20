import React from "react";
import Sidebar from "./adminsidebar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      {/* This div now correctly takes up the remaining space and handles scrolling */}
      <div className="flex-1 overflow-y-auto">
        <Outlet /> {/* Pages render here */}
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
//     <div className="flex h-screen relative">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <div className="flex-1 overflow-y-auto z-10 p-6">
//         <Outlet /> {/* Pages render here */}
//       </div>
//     </div>
//   );
// };

// export default Layout;