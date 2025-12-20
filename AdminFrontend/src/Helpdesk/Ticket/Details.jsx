import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  MessageSquare,
  ChevronDown,
  Check,
  Tag,
  Users,
  Calendar,
  Flag,
  User,
  Mail,
  List,
  UserCheck as AssigneeIcon,
  Clock,
  Printer,
  Trash2,
  Paperclip,
  Smile,
  Mic,
  Send,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';

// --- Mock Data ---
const mockTicketDetails = {
  title: "Theme customisation issue",
  status: "Open",
  priority: "High Priority",
  customer: "Customer Name",
  conversation: [
    {
      type: "comment",
      user: { name: "Tivo", avatar: "https://placehold.co/40x40/f43f5e/ffffff?text=T" },
      time: "added a comment - 23 minutes ago",
      text: [
        "hello John lui,",
        "you need to create “toolbar-options” div only once in a page in your code, this div fill found every “td” tag in your page, just remove those things",
        "and also in option button add “btn-sm” class in it."
      ],
      code: `<tbody>\n  <tr class="“toolbar-options”">\n    <td>...</td>\n  </tr>\n</tbody>`,
      images: []
    },
    {
      type: "comment",
      user: { name: "User", avatar: "https://placehold.co/40x40/3b82f6/ffffff?text=U" },
      time: "added a comment - 15 minutes ago",
      text: [
        "hello Tivo,",
        "i tried to resolve this issue, but i couldn't, you can see in the screenshot below",
        "please try to resolve this issue, and also in option button add “btn-sm” class in it."
      ],
      code: null,
      images: [
        "https://placehold.co/150x100/4d7c0f/ffffff?text=Image+1",
        "https://placehold.co/150x100/581c87/ffffff?text=Image+2",
        "https://placehold.co/150x100/f59e0b/ffffff?text=Image+3",
        "https://placehold.co/150x100/0d9488/ffffff?text=Image+4",
        "https://placehold.co/150x100/1d4ed8/ffffff?text=Image+5",
      ]
    },
    {
      type: "comment",
      user: { name: "Tivo", avatar: "https://placehold.co/40x40/f43f5e/ffffff?text=T" },
      time: "added a comment - 5 minutes ago",
      text: [
        "hello John lui,",
        "you need to create “toolbar-options” div only once in a page in your code, this div fill found every “td” tag in your page, just remove those things",
        "and also in option button add “btn-sm” class in it."
      ],
      code: `<tbody>\n  <tr class="“toolbar-options”">\n    <td>...</td>\n  </tr>\n</tbody>`,
      images: []
    }
  ]
};

const mockDetailOptions = {
  status: [ { value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed' } ],
  assignee: [ { value: 'jack', label: 'Jack P.' }, { value: 'sara', label: 'Sara K.' } ],
  customer: [ { value: 'john', label: 'John Lui' }, { value: 'jane', label: 'Jane Doe' } ],
  category: [ { value: 'alpha', label: 'Alpha' }, { value: 'beta', label: 'Beta' } ],
  assignGroup: [ { value: 'one', label: 'One' }, { value: 'two', label: 'Two' } ],
  created: [ { value: 'today', label: 'Today' }, { value: 'yesterday', label: 'Yesterday' } ],
  response: [ { value: 'due', label: 'Due' }, { value: 'overdue', label: 'Overdue' } ],
};

// --- Glass Card Component ---
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
    {children}
  </div>
);

// --- Breadcrumbs Component ---
const Breadcrumbs = () => (
  <nav className="flex items-center text-sm text-gray-100 mb-6" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      <li className="inline-flex items-center">
        <a href="#" className="inline-flex items-center text-gray-100 hover:text-white">
          <Home className="w-4 h-4 mr-2" />
          Home
        </a>
      </li>
      <li>
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <a href="#" className="ml-1 text-gray-100 hover:text-white md:ml-2">Ticket</a>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <span className="ml-1 text-gray-300 md:ml-2">Ticket Details</span>
        </div>
      </li>
    </ol>
  </nav>
);

// --- CustomSelect Component (from create-ticket) ---
const CustomSelect = ({ label, options, selected, onSelect, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = icon;

  const handleBlur = () => { setTimeout(() => { setIsOpen(false); }, 150); };

  return (
    <div className="relative mb-4">
      {label && <label className="block text-gray-800 text-sm font-medium mb-1">{label}</label>}
      <button
        type="button"
        className="w-full p-2.5 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur} 
      >
        <div className="flex items-center">
          {Icon && <Icon className="w-4 h-4 text-gray-600 mr-2" />}
          <span className="text-sm">{selected ? selected.label : 'Select...'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 max-h-48 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-3 py-2 text-sm text-gray-800 hover:bg-indigo-100 cursor-pointer flex justify-between items-center"
                onMouseDown={() => { onSelect(option); setIsOpen(false); }}
              >
                {option.label}
                {selected && selected.value === option.value && <Check className="w-5 h-5 text-indigo-600" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Comment Card Component ---
const CommentCard = ({ comment }) => (
  <div className="flex gap-4">
    <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
    <div className="flex-1">
      <div className="bg-white/50 border border-white/30 rounded-lg shadow-sm">
        {/* Comment Header */}
        <div className="px-4 py-3 border-b border-white/30">
          <span className="font-semibold text-gray-900">{comment.user.name}</span>
          <span className="text-xs text-gray-600 ml-2">{comment.time}</span>
        </div>
        {/* Comment Body */}
        <div className="p-4 space-y-3">
          {comment.text.map((p, i) => <p key={i} className="text-gray-800 text-sm">{p}</p>)}
          
          {/* Code Snippet */}
          {comment.code && (
            <pre className="bg-gray-800 text-gray-200 text-xs rounded-lg p-3 overflow-x-auto">
              <code>{comment.code}</code>
            </pre>
          )}

          {/* Image Gallery */}
          {comment.images && comment.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {comment.images.map((imgSrc, i) => (
                <img 
                  key={i} 
                  src={imgSrc} 
                  alt={`attachment ${i+1}`} 
                  className="w-24 h-16 object-cover rounded-lg border-2 border-white/50 shadow-sm"
                  onError={(e) => { e.target.src = 'https://placehold.co/150x100/cccccc/ffffff?text=Error'; }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// --- Reply Box Component ---
const ReplyBox = () => (
  <div className="flex gap-4 mt-6">
    <img src="https://placehold.co/40x40/6366f1/ffffff?text=Me" alt="My Avatar" className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
    <div className="flex-1">
      <GlassCard className="p-0">
        <textarea 
          rows="4" 
          placeholder="Type your message..."
          className="w-full p-4 bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-600"
        ></textarea>
        {/* Reply Toolbar */}
        <div className="p-3 bg-white/30 border-t border-white/40 flex justify-between items-center rounded-b-2xl">
          <div className="flex items-center gap-3">
            <button className="text-gray-600 hover:text-indigo-600"><Paperclip className="w-5 h-5" /></button>
            <button className="text-gray-600 hover:text-indigo-600"><LinkIcon className="w-5 h-5" /></button>
            <button className="text-gray-600 hover:text-indigo-600"><ImageIcon className="w-5 h-5" /></button>
            <button className="text-gray-600 hover:text-indigo-600"><Smile className="w-5 h-5" /></button>
            <button className="text-gray-600 hover:text-indigo-600"><Mic className="w-5 h-5" /></button>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>
      </GlassCard>
    </div>
  </div>
);


// --- Main App Component ---
export default function TicketDetails() {
  const appStyle = {
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  // State for selections in the sidebar
  const [status, setStatus] = useState(mockDetailOptions.status[0]);
  const [assignee, setAssignee] = useState(mockDetailOptions.assignee[0]);
  const [customer, setCustomer] = useState(mockDetailOptions.customer[0]);
  const [category, setCategory] = useState(mockDetailOptions.category[0]);
  const [assignGroup, setAssignGroup] = useState(mockDetailOptions.assignGroup[0]);
  const [created, setCreated] = useState(mockDetailOptions.created[0]);
  const [response, setResponse] = useState(mockDetailOptions.response[0]);

  return (
    <div style={appStyle} className="font-inter flex min-h-screen p-6">
      <div className="flex-1 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Breadcrumbs />
          
          {/* Ticket Header */}
          <GlassCard className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{mockTicketDetails.title}</h1>
              <span className="text-xs text-gray-600">#TKT-12345</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">{mockTicketDetails.status}</span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">{mockTicketDetails.priority}</span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">{mockTicketDetails.customer}</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </GlassCard>

          {/* Conversation Thread */}
          <div className="space-y-6">
            {mockTicketDetails.conversation.map((item, index) => (
              <CommentCard key={index} comment={item} />
            ))}
          </div>

          {/* Reply Box */}
          <ReplyBox />

        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-6">
            <GlassCard>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ticket Details</h3>
              <button className="w-full mb-4 px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 font-semibold">
                Add/Edit Functions
              </button>

              {/* Detail Selects */}
              <CustomSelect icon={Flag} options={mockDetailOptions.status} selected={status} onSelect={setStatus} />
              <CustomSelect icon={AssigneeIcon} label="Assignee" options={mockDetailOptions.assignee} selected={assignee} onSelect={setAssignee} />
              
              {/* Simple Info Fields */}
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-medium mb-1">Customer</label>
                <div className="flex items-center p-2.5 bg-white/50 border border-white/30 rounded-lg">
                  <User className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-800">John Lui</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center p-2.5 bg-white/50 border border-white/30 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-800">user@gmail.com</span>
                </div>
              </div>

              <CustomSelect icon={List} label="Category" options={mockDetailOptions.category} selected={category} onSelect={setCategory} />
              <CustomSelect icon={Users} label="Assign Group" options={mockDetailOptions.assignGroup} selected={assignGroup} onSelect={setAssignGroup} />
              <CustomSelect icon={Calendar} label="Created" options={mockDetailOptions.created} selected={created} onSelect={setCreated} />
              <CustomSelect icon={Clock} label="Response" options={mockDetailOptions.response} selected={response} onSelect={setResponse} />
              
              <div className="flex items-center justify-between mt-4">
                <button className="text-sm text-indigo-600 hover:underline font-medium">Show More</button>
                <button className="px-5 py-2.5 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all">
                  Update
                </button>
              </div>

            </GlassCard>
          </div>
        </aside>
      </div>
      
      {/* Placeholder for the purple button in the corner */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
          <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}