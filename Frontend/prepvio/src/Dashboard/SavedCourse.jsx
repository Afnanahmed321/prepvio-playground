import React, { useState } from 'react';
import {
    BookOpen,
    Heart,
    XCircle,
    Bookmark
} from 'lucide-react';

const initialSavedCourses = [
    {
        id: 1,
        title: 'Introduction to React',
        author: 'shreyansh coding',
        progress: 50,
        isFavorite: true,
        category: 'Frontend Development',
        image: '/components/REACT.png'
    },
    {
        id: 2,
        title: 'Advanced JavaScript',
        author: 'apna college',
        progress: 90,
        isFavorite: true,
        category: 'Backend Development',
        image: '/components/java.png'
    },
    {
        id: 3,
        title: 'The Complete Node.js Course',
        author: 'free code camp',
        progress: 20,
        isFavorite: false,
        category: 'Backend Development',
        image: 'https://source.unsplash.com/featured/?nodejs,code'
    },
    {
        id: 4,
        title: 'UI/UX Masterclass',
        author: 'Emily Brown',
        progress: 75,
        isFavorite: false,
        category: 'Ui/UX Development',
        image: 'https://source.unsplash.com/featured/?css,design'
    },
    {
        id: 5,
        title: 'Data Structures and Algorithms',
        author: 'Michael Wilson',
        progress: 100,
        isFavorite: true,
        category: 'Computer Science',
        image: 'https://source.unsplash.com/featured/?algorithm,code'
    },
];

const SavedCoursesPage = () => {
    const [savedCourses, setSavedCourses] = useState(initialSavedCourses);
    const [view, setView] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleToggleFavorite = (courseId) => {
        setSavedCourses(
            savedCourses.map(course =>
                course.id === courseId ? { ...course, isFavorite: !course.isFavorite } : course
            )
        );
    };

    const handleRemoveCourse = (courseId) => {
        setSavedCourses(savedCourses.filter(course => course.id !== courseId));
    };

    const filteredCourses = savedCourses.filter(course => {
        const searchMatch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.author.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = !selectedCategory || course.category === selectedCategory;
        return searchMatch && categoryMatch;
    });

    const categories = ['All', ...new Set(savedCourses.map(course => course.category))];

    return (
        <div className="flex-1 p-6">
            <div className="bg-white/30 backdrop-blur-2xl border border-white/50 shadow-lg min-h-screen flex flex-col rounded-3xl transition-all duration-300">
                
                {/* Header */}
                <div className="p-6 border-b border-white/50">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <Bookmark className="w-6 h-6 text-indigo-600"/> Saved Courses
                    </h2>
                    <div className="flex gap-4 items-center mt-4">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 bg-white/50 backdrop-blur-sm border border-white/30 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={selectedCategory || 'All'}
                            onChange={e => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
                            className="bg-white/50 backdrop-blur-sm border border-white/30 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-full"
                            title={view === 'grid' ? 'View as List' : 'View as Grid'}
                        >
                            {view === 'grid' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="8" x2="21" y1="8" y2="8"></line><line x1="8" x2="21" y1="16" y2="16"></line><path d="M3 8h.01"></path><path d="M3 16h.01"></path><path d="M3 20h18v-6H3z"></path></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Courses */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">No courses found matching your criteria.</div>
                    ) : (
                        <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                            {filteredCourses.map(course => (
                                <div
                                    key={course.id}
                                    className={`bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-4 relative transition-all duration-300 hover:bg-white/70 ${view === 'list' ? 'flex items-center gap-4' : ''}`}
                                >
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => handleToggleFavorite(course.id)}
                                            className={`p-1 rounded-full ${course.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                                            title={course.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                        >
                                            <Heart className="w-5 h-5"/>
                                        </button>
                                        <button
                                            onClick={() => handleRemoveCourse(course.id)}
                                            className="text-gray-500 hover:text-red-500 p-1 rounded-full"
                                            title="Remove Course"
                                        >
                                            <XCircle className="w-5 h-5"/>
                                        </button>
                                    </div>

                                    {view === 'grid' ? (
                                        <>
                                            <div className="w-full aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                                                {course.image ? <img src={course.image} alt={course.title} className="object-cover w-full h-full"/> : <BookOpen className="w-12 h-12 text-gray-500"/>}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                            <p className="text-sm text-gray-600">By {course.author}</p>
                                            <div className="mt-2">
                                                <div className="bg-gray-300 rounded-full h-2 mb-1">
                                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                                <p className="text-xs text-gray-600">Progress: {course.progress}%</p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/50 border border-white/30 mt-2">{course.category}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                {course.image ? <img src={course.image} alt={course.title} className="object-cover w-full h-full"/> : <BookOpen className="w-10 h-10 text-gray-500"/>}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                                <p className="text-sm text-gray-600">By {course.author}</p>
                                                <div className="mt-2">
                                                    <div className="bg-gray-300 rounded-full h-2 mb-1 w-full">
                                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                    </div>
                                                    <p className="text-xs text-gray-600">Progress: {course.progress}%</p>
                                                </div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/50 border border-white/30 mt-2">{course.category}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedCoursesPage;



// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     Settings,
//     MessageCircle,
//     Bookmark,
//     Trophy,
//     Search,
//     CreditCard,
//     LifeBuoy,
//     ChevronDown,
//     BookOpen,
//     Heart,
//     XCircle,
//     LogOut
// } from 'lucide-react';

// // Reusable component for the sidebar links
// const SidebarLink = ({ icon: Icon, label, isActive, onClick }) => (
//     <button
//         onClick={onClick}
//         className={`flex items-center w-full gap-2 py-3 px-4 rounded-lg text-sm font-medium
//         ${isActive ? 'bg-blue-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
//     >
//         <Icon className="w-5 h-5" />
//         <span>{label}</span>
//     </button>
// );

// // Reusable component for dropdown menus in the sidebar
// const DropdownMenu = ({ title, children, icon: Icon, isActive = false }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div className="space-y-1">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={`flex items-center w-full justify-between py-3 px-4 text-sm rounded-lg
//                 ${isActive ? 'bg-blue-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
//             >
//                 <div className="flex items-center gap-2">
//                     {Icon && <Icon className="w-5 h-5" />}
//                     <span>{title}</span>
//                 </div>
//                 <ChevronDown
//                     className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//                 />
//             </button>
//             {isOpen && <div className="pl-4 space-y-1">{children}</div>}
//         </div>
//     );
// };

// // Dummy data for saved courses with images added
// const initialSavedCourses = [
//     {
//         id: 1,
//         title: 'Introduction to React',
//         author: 'shreyansh coding',
//         progress: 50,
//         isFavorite: true,
//         category: 'Frontend Development',
//         image: '/components/REACT.png'
//     },
//     {
//         id: 2,
//         title: 'Advanced JavaScript',
//         author: 'apna college',
//         progress: 90,
//         isFavorite: true,
//         category: 'Backend Development',
//         image: '/components/java.png'
//     },
//     {
//         id: 3,
//         title: 'The Complete Node.js Course',
//         author: 'free code camp',
//         progress: 20,
//         isFavorite: false,
//         category: 'Backend Development',
//         image: 'https://source.unsplash.com/featured/?nodejs,code'
//     },
//     {
//         id: 4,
//         title: 'UI/UX Masterclass',
//         author: 'Emily Brown',
//         progress: 75,
//         isFavorite: false,
//         category: 'Ui/UX Development',
//         image: 'https://source.unsplash.com/featured/?css,design'
//     },
//     {
//         id: 5,
//         title: 'Data Structures and Algorithms',
//         author: 'Michael Wilson',
//         progress: 100,
//         isFavorite: true,
//         category: 'Computer Science',
//         image: 'https://source.unsplash.com/featured/?algorithm,code'
//     },
// ];

// const SavedCoursesPage = () => {
//     const [savedCourses, setSavedCourses] = useState(initialSavedCourses);
//     const [view, setView] = useState('grid'); // 'grid' or 'list'
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState(null); // null for all

//     const handleToggleFavorite = (courseId) => {
//         setSavedCourses(
//             savedCourses.map((course) =>
//                 course.id === courseId
//                     ? { ...course, isFavorite: !course.isFavorite }
//                     : course
//             )
//         );
//     };

//     const handleRemoveCourse = (courseId) => {
//         setSavedCourses(savedCourses.filter((course) => course.id !== courseId));
//     };

//     // Filter courses based on search query and category
//     const filteredCourses = savedCourses.filter((course) => {
//         const searchMatch =
//             course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             course.author.toLowerCase().includes(searchQuery.toLowerCase());
//         const categoryMatch =
//             !selectedCategory || course.category === selectedCategory;
//         return searchMatch && categoryMatch;
//     });

//     // Get unique categories for the filter dropdown
//     const categories = ['All', ...new Set(savedCourses.map((course) => course.category))];

//     return (
//         <div className="flex h-screen bg-gray-100 overflow-x-hidden">
//             {/* Sidebar */}
//             <aside className="w-64 bg-white border-r border-cyan-50 p-4">
//                 <h1 className="text-2xl font-bold text-black mb-6 px-2">DASHBOARD</h1>
//                 <div className="space-y-2">
//                     <SidebarLink icon={LayoutDashboard} label="Dashboard" />
//                     <SidebarLink icon={Settings} label="Setting" />
//                     <DropdownMenu title="Messages" icon={MessageCircle}>
//                         <SidebarLink icon={MessageCircle} label="Inbox" />
//                         <SidebarLink icon={MessageCircle} label="Sent" />
//                         <SidebarLink icon={MessageCircle} label="Drafts" />
//                     </DropdownMenu>
//                     <DropdownMenu title="Saved courses" icon={Bookmark} isActive>
//                         <SidebarLink icon={Bookmark} label="My Courses" />
//                         <SidebarLink icon={Bookmark} label="Favorites" />
//                     </DropdownMenu>
//                     <DropdownMenu title="Accomplishments" icon={Trophy}>
//                         <SidebarLink icon={Trophy} label="Certificates" />
//                         <SidebarLink icon={Trophy} label="Badges" />
//                     </DropdownMenu>
//                     <SidebarLink icon={Search} label="Interview Analysis" />
//                     <SidebarLink icon={CreditCard} label="Payroll" />
//                     <DropdownMenu title="Help Desk" icon={LifeBuoy}>
//                         <SidebarLink icon={LifeBuoy} label="Chat" />
//                         <SidebarLink icon={LifeBuoy} label="FAQ" />
//                     </DropdownMenu>
//                     <SidebarLink icon={LogOut} label="LogOut" />
//                 </div>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-8 overflow-y-auto">
//                 <div className="bg-white border-gray-500 shadow-lg min-h-screen flex flex-col rounded-lg">
//                     <div className="p-6 border-b border-gray-300">
//                         <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
//                             <Bookmark className="w-6 h-6" />
//                             Saved Courses
//                         </h2>
//                         <div className="flex gap-4 items-center mt-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search courses..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-64 bg-gray-100 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <select
//                                 value={selectedCategory || 'All'}
//                                 onChange={(e) =>
//                                     setSelectedCategory(e.target.value === 'All' ? null : e.target.value)
//                                 }
//                                 className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 {categories.map((category) => (
//                                     <option key={category} value={category}>
//                                         {category}
//                                     </option>
//                                 ))}
//                             </select>
//                             <button
//                                 type="button"
//                                 onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
//                                 className="text-gray-500 hover:text-gray-700 p-2 rounded-full"
//                                 title={view === 'grid' ? 'View as List' : 'View as Grid'}
//                             >
//                                 {view === 'grid' ? (
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="8" x2="21" y1="8" y2="8"></line><line x1="8" x2="21" y1="16" y2="16"></line><path d="M3 8h.01"></path><path d="M3 16h.01"></path><path d="M3 20h18v-6H3z"></path></svg>
//                                 ) : (
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                     <div className="flex-1 overflow-y-auto p-6">
//                         {filteredCourses.length === 0 ? (
//                             <div className="text-center text-gray-500 py-8">
//                                 No courses found matching your criteria.
//                             </div>
//                         ) : (
//                             <div
//                                 className={`space-y-6 ${
//                                     view === 'grid'
//                                         ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
//                                         : 'space-y-4'
//                                 }`}
//                             >
//                                 {filteredCourses.map((course) => (
//                                     <div
//                                         key={course.id}
//                                         className={`bg-gray-100 border border-gray-300 rounded-lg p-4 relative ${
//                                             view === 'list' ? 'flex items-center gap-4' : ''
//                                         }`}
//                                     >
//                                         <div className="absolute top-2 right-2 flex gap-2">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => handleToggleFavorite(course.id)}
//                                                 className={`p-1 rounded-full ${
//                                                     course.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                                 title={course.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//                                             >
//                                                 <Heart className="w-5 h-5" />
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => handleRemoveCourse(course.id)}
//                                                 className="text-gray-500 hover:text-red-500 p-1 rounded-full"
//                                                 title="Remove Course"
//                                             >
//                                                 <XCircle className="w-5 h-5" />
//                                             </button>
//                                         </div>

//                                         {view === 'grid' ? (
//                                             <>
//                                                 <div className="w-full aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4 overflow-hidden">
//                                                     {course.image ? (
//                                                         <img src={course.image} alt={course.title} className="object-cover w-full h-full" />
//                                                     ) : (
//                                                         <BookOpen className="w-12 h-12 text-gray-500" />
//                                                     )}
//                                                 </div>
//                                                 <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
//                                                 <p className="text-sm text-gray-600">By {course.author}</p>
//                                                 <div className="mt-2">
//                                                     <div className="bg-gray-300 rounded-full h-2 mb-1">
//                                                         <div
//                                                             className="bg-blue-500 h-full rounded-full"
//                                                             style={{ width: `${course.progress}%` }}
//                                                         ></div>
//                                                     </div>
//                                                     <p className="text-xs text-gray-600">Progress: {course.progress}%</p>
//                                                 </div>
//                                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-300 text-gray-800 mt-2">
//                                                     {course.category}
//                                                 </span>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
//                                                     {course.image ? (
//                                                         <img src={course.image} alt={course.title} className="object-cover w-full h-full" />
//                                                     ) : (
//                                                         <BookOpen className="w-10 h-10 text-gray-500" />
//                                                     )}
//                                                 </div>
//                                                 <div className="flex-1 space-y-2">
//                                                     <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
//                                                     <p className="text-sm text-gray-600">By {course.author}</p>
//                                                     <div className="mt-2">
//                                                         <div className="bg-gray-300 rounded-full h-2 mb-1 w-full">
//                                                             <div
//                                                                 className="bg-blue-500 h-full rounded-full"
//                                                                 style={{ width: `${course.progress}%` }}
//                                                             ></div>
//                                                         </div>
//                                                         <p className="text-xs text-gray-600">Progress: {course.progress}%</p>
//                                                     </div>
//                                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-300 text-gray-800 mt-2">
//                                                         {course.category}
//                                                     </span>
//                                                 </div>
//                                             </>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default SavedCoursesPage;
