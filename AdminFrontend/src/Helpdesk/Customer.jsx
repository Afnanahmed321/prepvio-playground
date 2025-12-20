import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  MessageSquare,
  ChevronDown,
  Search,
  Edit,
  Trash2,
  Plus,
  ArrowUpDown, // For sorting icons
  X // For closing the modal
} from 'lucide-react';

// --- Mock Data ---
const initialMockCustomers = [
  { id: 1, name: "Mark Jason", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 2, name: "Alice Nicol", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 3, name: "Harry Cook", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 4, name: "Tom Hanry", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 5, name: "Martin Frank", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 6, name: "Endrew Khan", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 7, name: "Christina Methewv", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 8, name: "Jakson Pit", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 9, name: "Nikolas Jons", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
  { id: 10, name: "Nik Cage", email: "mark@mark.com", account: "N/A", lastLogin: "January 01, 2019 at 03:35 PM" },
];

// --- Glass Card Component ---
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
    {children}
  </div>
);

// --- Breadcrumbs Component (Simplified for this page) ---
const Breadcrumbs = () => (
  <nav className="flex items-center text-sm text-gray-100 mb-6" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      <li aria-current="page">
        <div className="flex items-center">
          <span className="ml-1 text-gray-300 md:ml-2">Customers</span>
        </div>
      </li>
    </ol>
  </nav>
);

// --- Action Buttons ---
const ActionButtons = () => (
  <div className="flex items-center gap-2 text-gray-600">
    <button className="p-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"><Edit className="w-4 h-4" /></button>
    <button className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
  </div>
);

// --- Table Header Cell ---
const TableHeader = ({ children }) => (
  <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase">
    <div className="flex items-center gap-1">
      {children}
      <ArrowUpDown className="w-3 h-3 text-gray-500 opacity-50" />
    </div>
  </th>
);

// --- Add Customer Modal ---
const AddCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [account, setAccount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      // Simple validation - changed alert to console.warn
      console.warn("Please fill in Name and Email.");
      return;
    }
    onAddCustomer({ name, email, account: account || 'N/A' });
    // Reset form and close
    setName('');
    setEmail('');
    setAccount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <GlassCard className="w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Customer</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-600 hover:bg-white/50">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="account" className="block text-sm font-medium text-gray-800 mb-1">Account (Optional)</label>
              <input 
                type="text" 
                id="account" 
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full p-2.5 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-8">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 bg-white/50 text-gray-800 rounded-lg shadow-md hover:bg-white/80 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 font-semibold"
            >
              Add Customer
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};


// --- Main App Component ---
export default function CustomerList() {
  const appStyle = {
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const [entries, setEntries] = useState(10);
  const [customers, setCustomers] = useState(initialMockCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search

  const handleAddCustomer = (newCustomerData) => {
    const newCustomer = {
      ...newCustomerData,
      id: customers.length + 1, // Simple ID generation
      lastLogin: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace('at', 'at')
    };
    setCustomers(prevCustomers => [newCustomer, ...prevCustomers]);
  };

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
      return customers;
    }
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const totalEntries = filteredCustomers.length; // Update total entries based on filter
  const paginatedCustomers = filteredCustomers.slice(0, entries); // Paginate the filtered list

  return (
    <div style={appStyle} className="font-inter min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Customers</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>New Customer</span>
          </button>
        </div>

        <GlassCard className="p-6">
          {/* Card Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            {/* Entries per page */}
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <select 
                value={entries} 
                onChange={(e) => setEntries(Number(e.target.value))}
                className="bg-white/50 border border-white/30 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries per page</span>
            </div>
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search by name or email..."
                value={searchTerm} // Controlled component
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                className="w-full p-2.5 pl-10 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-600 text-sm"
              />
              <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              {/* Table Header */}
              <thead className="border-b border-white/30">
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Account</TableHeader>
                  <TableHeader>Last Login</TableHeader>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-white/20">
                {paginatedCustomers.map((customer) => ( // Use paginatedCustomers
                  <tr key={customer.id} className="hover:bg-white/10 transition-colors">
                    <td className="p-4">
                      <span className="font-medium text-gray-900 text-sm">{customer.name}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-800">{customer.email}</td>
                    <td className="p-4 text-sm text-gray-800">{customer.account}</td>
                    <td className="p-4 text-sm text-gray-800">{customer.lastLogin}</td>
                    <td className="p-4"><ActionButtons /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/30">
            <p className="text-sm text-gray-700">
              Showing 1 to {Math.min(entries, paginatedCustomers.length)} of {totalEntries} entries
            </p>
            {/* Pagination removed as it's not in the screenshot */}
          </div>

        </GlassCard>
      </div>
      
      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
          <MessageSquare className="w-6 h-6" />
      </button>

      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
    </div>
  );
}