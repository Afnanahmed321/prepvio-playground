import React, { useState, useMemo, useEffect } from 'react';

// --- Icon Components ---
const LayoutDashboard = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>);
const Users = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const GraduationCap = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.97a7 7 0 0 0-14.71 0"/><path d="M10.74 13.9a7 7 0 0 0 10.68-2.93"/><path d="M12 2v20"/><path d="M22 10V6L12 2 2 6v4"/></svg>);
const Briefcase = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const Bot = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4h-2"/><path d="M19 14V8h-2"/><path d="M5 14V8h2"/><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M7 21a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2z"/></svg>);
const FileText = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>);
const Settings = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v2.07a2 2 0 0 1-.7.42l-2 1.25a2 2 0 0 0-.64 2.8l.68 1.48a2 2 0 0 1-.22 2.2L6 17a2 2 0 0 0 .54 2.6l1.25.7c.42.23.7.67.7 1.15V22a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-2.07a2 2 0 0 1 .7-.42l2-1.25a2 2 0 0 0 .64-2.8l-.68-1.48a2 2 0 0 1 .22-2.2L18 7a2 2 0 0 0-.54-2.6l-1.25-.7a2 2 0 0 1-.7-.42V2a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>);
const Plus = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>);
const X = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>);
const ListTodo = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>);
const ChevronDown = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>);
const MoreVertical = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>);

// --- Features ---
const FEATURES = {
  DASHBOARD: 'Dashboard',
  USER_MANAGEMENT: 'User Management',
  LEARN_PERFORM: 'Learn & Perform',
  JOB_PORTAL: 'Job Portal',
  AI_INTERVIEW: 'AI Interview Practice',
  RESUME_ANALYZER: 'Resume Analyzer',
  CONTENT_MANAGEMENT: 'Content Management',
};

// --- Mock Data ---
const INITIAL_USERS = [
  { id: 'usr-1', name: 'Alice Johnson', email: 'alice@example.com', feature: FEATURES.LEARN_PERFORM, status: 'Active' },
  { id: 'usr-2', name: 'Bob Smith', email: 'bob@example.com', feature: FEATURES.JOB_PORTAL, status: 'Suspended' },
  { id: 'usr-3', name: 'Charlie Day', email: 'charlie@example.com', feature: FEATURES.AI_INTERVIEW, status: 'Active' },
];

const INITIAL_CATEGORIES = [
  { _id: 'cat-1', name: 'Web Development' },
  { _id: 'cat-2', name: 'Data Science' },
  { _id: 'cat-3', name: 'DevOps' },
];

const INITIAL_CHANNELS = [
  { _id: 'ch-1', name: 'React Basics' },
  { _id: 'ch-2', name: 'Node.js Internals' },
  { _id: 'ch-3', name: 'Python for DS' },
];

const INITIAL_COURSES = [
  { _id: 'crs-1', name: 'MERN Stack Bootcamp', description: 'Full-stack development with MERN.', imageUrl: '', categoryId: 'cat-1', channels: ['ch-1', 'ch-2'] },
  { _id: 'crs-2', name: 'Data Science with Python', description: 'Learn data analysis and ML.', imageUrl: '', categoryId: 'cat-2', channels: ['ch-3'] },
];

const kpiData = [
  { month: 'Feb', value: 30 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 40 },
  { month: 'May', value: 60 },
  { month: 'Jun', value: 75 },
];

const topPerformers = [
  { name: 'Louis Duitama', tasks: '214 tasks completed', img: '' },
  { name: 'Mariana Kuhlman', tasks: '208 tasks completed', img: '' },
];

// --- Utility Components ---
const GlassCard = ({ children, className = '' }) => (
  <div className={`p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-300/80 shadow-xl ${className}`}>
    {children}
  </div>
);

const GlassButton = ({ children, onClick, variant = 'primary', className = '' }) => {
  let variantClasses = variant === 'primary'
    ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200';
  return (
    <button className={`px-4 py-2 rounded-xl ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

// --- Dashboard Components ---
const StatCard = ({ title, value, IconComponent }) => (
  <GlassCard className="flex items-center gap-4 p-5">
    <div className="p-3 rounded-lg bg-orange-100">
      <IconComponent className="w-6 h-6 text-orange-600" />
    </div>
    <div>
      <span className="text-sm text-gray-500">{title}</span>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </GlassCard>
);

const KpiChart = () => (
  <GlassCard className="flex-1">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Average KPI Score</h2>
    <div className="flex gap-4">
      {kpiData.map((d, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-6 h-32 bg-orange-400 rounded-t-lg" style={{ height: `${d.value}%` }}></div>
          <span className="text-xs text-gray-500">{d.month}</span>
        </div>
      ))}
    </div>
  </GlassCard>
);

const EmployeesTable = () => {
  const employees = [
    { id: 'E001', name: 'Auliv Abbott', position: 'Manager', performance: 70 },
    { id: 'E002', name: 'Martin Feeney', position: 'Specialist', performance: 85 },
  ];
  return (
    <GlassCard className="p-0 overflow-x-auto">
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="border-b border-gray-300 bg-gray-100">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3 hidden sm:table-cell">Role</th>
            <th className="px-6 py-3">Performance</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-b border-gray-200">
              <td className="px-6 py-4">{emp.id}</td>
              <td className="px-6 py-4">{emp.name}</td>
              <td className="px-6 py-4 hidden sm:table-cell">{emp.position}</td>
              <td className="px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: `${emp.performance}%` }}></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
};

const RightSidebar = () => (
  <aside className="w-full lg:w-80 bg-[#1C1C1C] text-white p-6 rounded-2xl">
    <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
    <ul className="space-y-3">
      <li>Project Manager - Today 9am</li>
      <li>Team Sync - Today 11am</li>
    </ul>
  </aside>
);

const DashboardHome = () => (
  <div className="flex flex-col lg:flex-row gap-5">
    <div className="flex-1 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Employees" value="49,229" IconComponent={Users} />
        <StatCard title="Total Project" value="48,229" IconComponent={Briefcase} />
        <StatCard title="Job Applicant" value="49,229" IconComponent={FileText} />
      </div>
      <KpiChart />
      <EmployeesTable />
    </div>
    <RightSidebar />
  </div>
);

// --- ContentManagement ---
const ContentManagement = ({ courses, setCourses, categories, channels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const openModal = (course) => { setEditingCourse(course); setIsOpen(true); };
  const closeModal = () => { setEditingCourse(null); setIsOpen(false); };

  const saveCourse = (data) => {
    if (editingCourse) {
      setCourses(courses.map(c => c._id === editingCourse._id ? { ...c, ...data } : c));
    } else {
      setCourses([...courses, { ...data, _id: `crs-${Date.now()}` }]);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
        <GlassButton onClick={() => openModal(null)}><Plus className="w-4 h-4"/> Add New</GlassButton>
      </div>
      <GlassCard className="p-0 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="border-b border-gray-300 bg-gray-100">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c._id} className="border-b border-gray-200">
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4 hidden sm:table-cell">{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [activeTab, setActiveTab] = useState(FEATURES.DASHBOARD);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [courses, setCourses] = useState(INITIAL_COURSES);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          {Object.values(FEATURES).map(f => (
            <button
              key={f}
              className={`text-left px-4 py-2 rounded-lg ${activeTab === f ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100'}`}
              onClick={() => setActiveTab(f)}
            >
              {f}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === FEATURES.DASHBOARD && <DashboardHome />}
        {activeTab === FEATURES.USER_MANAGEMENT && <UserManagement users={users} setUsers={setUsers} />}
        {activeTab === FEATURES.CONTENT_MANAGEMENT && 
          <ContentManagement courses={courses} setCourses={setCourses} categories={INITIAL_CATEGORIES} channels={INITIAL_CHANNELS} />}
      </main>
    </div>
  );
};

// --- Export App ---
export default App;