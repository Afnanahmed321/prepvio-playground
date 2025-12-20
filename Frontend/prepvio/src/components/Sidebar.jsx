import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  MessageCircle,
  Bookmark,
  Search,
  LifeBuoy,
  ChevronDown,
  CreditCard,
  LogOut,
  Bell,
  BookOpen,
  HelpCircle
} from "lucide-react";

const SidebarLink = ({ icon: Icon, label, to, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center w-full gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
        isActive
          ? "bg-white/30 backdrop-blur-2xl border border-white/50 text-indigo-600 shadow-md"
          : "text-gray-400 hover:text-indigo-600 hover:bg-white/20 hover:backdrop-blur-xl"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};

const DropdownMenu = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full justify-between py-3 px-4 text-sm text-gray-400 hover:text-indigo-600 hover:bg-white/20 hover:backdrop-blur-xl rounded-xl transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="pl-4 space-y-1">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg p-6 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 px-2">DASHBOARD</h1>
      <div className="space-y-2 flex-1 overflow-y-auto">
        <SidebarLink icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
        <SidebarLink icon={Settings} label="Account" to="/dashboard/setting" />
        <SidebarLink icon={Bell} label="Notifications" to="/dashboard/notifications" badge="3" />
        <SidebarLink icon={BookOpen} label="Learning" to="/dashboard/learning" badge="5" />
        <DropdownMenu title="Saved Courses" icon={Bookmark}>
          <SidebarLink icon={Bookmark} label="My Courses" to="/dashboard/saved-courses" />
        </DropdownMenu>
        <SidebarLink icon={Search} label="Interview Analysis" to="/dashboard/interview-analysis" />
        <SidebarLink icon={CreditCard} label="Payroll" to="/dashboard/payroll" />
        <DropdownMenu title="Help Desk" icon={LifeBuoy}>
          <SidebarLink icon={LifeBuoy} label="Inbox" to="/dashboard/messages/inbox" />
          <SidebarLink icon={HelpCircle} label="FAQs" to="/dashboard/help/faq" />
        </DropdownMenu>
        <SidebarLink icon={LogOut} label="LogOut" to="/logout" />
      </div>
    </aside>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Settings,
//   MessageCircle,
//   Bookmark,
//   Trophy,
//   Search,
//   LifeBuoy,
//   ChevronDown,
//   CreditCard,
//   LogOut,
//   BookOpen,
//   CheckCircle,
//   FileText,
//   Percent,
//   ChartLine,
//   PieChart
// } from "lucide-react";

// const SidebarLink = ({ icon: Icon, label, to }) => {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link
//       to={to}
//       className={`flex items-center w-full gap-2 py-3 px-4 rounded-lg text-sm font-medium ${
//         isActive ? "bg-blue-900 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
//       }`}
//     >
//       <Icon className="w-5 h-5" />
//       <span>{label}</span>
//     </Link>
//   );
// };

// const DropdownMenu = ({ title, icon: Icon, children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="space-y-1">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center w-full justify-between py-3 px-4 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
//       >
//         <div className="flex items-center gap-2">
//           {Icon && <Icon className="w-5 h-5" />}
//           <span>{title}</span>
//         </div>
//         <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
//       </button>
//       {isOpen && <div className="pl-4 space-y-1">{children}</div>}
//     </div>
//   );
// };

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-white  p-4 h-screen">
//       <h1 className="text-2xl font-bold mb-6 px-2">DASHBOARD</h1>
//       <div className="space-y-2">
//         <SidebarLink icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
//         <SidebarLink icon={Settings} label="Account" to="/dashboard/setting" />
//         <DropdownMenu title="Messages" icon={MessageCircle}>
//           <SidebarLink icon={MessageCircle} label="Inbox" to="/dashboard/messages/inbox" />
//           <SidebarLink icon={MessageCircle} label="Sent" to="/dashboard/messages/sent" />
//           <SidebarLink icon={MessageCircle} label="Draft" to="/dashboard/messages/draft" />
//         </DropdownMenu>
//         <DropdownMenu title="Saved Courses" icon={Bookmark}>
//           <SidebarLink icon={Bookmark} label="My Courses" to="/dashboard/saved-courses" />
//         </DropdownMenu>
//         <SidebarLink icon={Search} label="Interview Analysis" to="/dashboard/interview-analysis" />
//         <SidebarLink icon={CreditCard} label="Payroll" to="/dashboard/payroll" />
//         <DropdownMenu title="Help Desk" icon={LifeBuoy}>
//           <SidebarLink icon={LifeBuoy} label="Chat" to="/dashboard/help/chat" />
//           <SidebarLink icon={LifeBuoy} label="FAQ" to="/dashboard/help/faq" />
//         </DropdownMenu>
//         <SidebarLink icon={LogOut} label="LogOut" to="/logout" />
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
