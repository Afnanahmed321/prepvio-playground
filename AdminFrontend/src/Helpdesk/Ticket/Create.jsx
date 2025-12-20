import React, { useState, useRef } from 'react'; // Import useRef
import { 
  Home, 
  ChevronRight, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Code, 
  Image, 
  MessageSquare,
  ChevronDown,
  Check,
  UploadCloud, // Added icon
  X // Added icon
} from 'lucide-react';

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
          <a href="#" className="ml-1 text-gray-100 hover:text-white md:ml-2">Helpdesk</a>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <span className="ml-1 text-gray-300 md:ml-2">Create Ticket</span>
        </div>
      </li>
    </ol>
  </nav>
);

// --- Rich Text Editor Toolbar (simplified) ---
const RichTextToolbar = () => (
  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-t-lg border-b border-gray-200">
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700 flex items-center gap-1">
      Normal <ChevronDown className="w-4 h-4" />
    </button>
    <div className="w-px h-6 bg-gray-200 mx-1"></div>
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700"><Bold className="w-4 h-4" /></button>
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700"><Italic className="w-4 h-4" /></button>
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700"><Underline className="w-4 h-4" /></button>
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700"><List className="w-4 h-4" /></button>
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700"><Code className="w-4 h-4" /></button>
    <button className="p-1 rounded hover:bg-gray-200 text-gray-700"><Image className="w-4 h-4" /></button>
  </div>
);

// --- New CustomSelect Component ---
const CustomSelect = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on blur with a small delay to allow click events to register
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div className="relative">
      <label htmlFor={label} className="block text-gray-800 text-lg font-medium mb-2">{label}</label>
      <button
        type="button"
        id={label}
        className="w-full p-3 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur} 
      >
        <span>{selected ? selected.label : 'Default select'}</span>
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer flex justify-between items-center"
                onMouseDown={(e) => { // Use onMouseDown to prevent blur from firing before click
                  onSelect(option);
                  setIsOpen(false);
                }}
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


// --- Main App Component ---
export default function CreateTicket() {
  const appStyle = {
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('hello.'); // Pre-fill as per image
  const [files, setFiles] = useState([]); // State for files
  const [isDragging, setIsDragging] = useState(false); // State for drag-over
  const fileInputRef = useRef(null); // Ref for hidden file input

  // State for custom selects
  const customerOptions = [
    { value: 'customer1', label: 'Customer 1' },
    { value: 'customer2', label: 'Customer 2' },
    { value: 'customer3', label: 'Customer 3' },
  ];
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const categoryOptions = [
    { value: 'category1', label: 'Category A' },
    { value: 'category2', label: 'Category B' },
    { value: 'category3', label: 'Category C' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- File Handling Logic ---
  const handleFileAdd = (incomingFiles) => {
    const newFiles = Array.from(incomingFiles);
    // Prevent duplicates
    const uniqueNewFiles = newFiles.filter(
      (newFile) => !files.some((existingFile) => existingFile.name === newFile.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  const handleFileRemove = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileAdd(e.dataTransfer.files);
  };

  const handleFileInputChange = (e) => {
    handleFileAdd(e.target.files);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current.click();
  };
  // --- End File Handling ---

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted!', { 
      customer: selectedCustomer ? selectedCustomer.value : null,
      category: selectedCategory ? selectedCategory.value : null,
      subject, 
      description,
      files: files.map(f => f.name) // Log file names
    });
    // Add logic to send data to your MERN backend
    // You would typically use FormData to upload files
  };

  return (
    <div style={appStyle} className="font-inter flex min-h-screen p-6">
      <div className="flex-1 max-w-4xl mx-auto">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold text-white mb-8">Create Ticket</h1>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Customer Select */}
              <CustomSelect
                label="Customer"
                options={customerOptions}
                selected={selectedCustomer}
                onSelect={setSelectedCustomer}
              />

              {/* Category Select */}
              <CustomSelect
                label="Category"
                options={categoryOptions}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Subject Input */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-800 text-lg font-medium mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="Enter Subject" 
                className="w-full p-3 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Description Editor */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-gray-800 text-lg font-medium mb-2">Description</label>
              <div className="bg-white/50 border border-white/30 rounded-lg shadow-sm overflow-hidden">
                <RichTextToolbar />
                <textarea 
                  id="description" 
                  rows="8" 
                  className="w-full p-3 bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-600"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* File Drop Area */}
            <div 
              className={`border-2 border-dashed border-white/50 rounded-lg p-12 text-center text-gray-700 mb-4 bg-white/20 cursor-pointer transition-all duration-300 ${isDragging ? 'bg-white/40 border-indigo-500 scale-105' : 'hover:bg-white/30'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleDropZoneClick}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInputChange} 
                className="hidden" 
                multiple 
              />
              <div className="flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-indigo-700 mb-2" />
                <p className="font-semibold">Drop files here or click to upload</p>
                <p className="text-sm text-gray-600">You can add multiple files</p>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mb-8 space-y-2">
                <h4 className="text-lg font-medium text-gray-800">Selected Files:</h4>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li 
                      key={index} 
                      className="flex justify-between items-center p-2 bg-white/50 rounded-lg border border-white/30"
                    >
                      <span className="text-sm text-gray-800 truncate">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => handleFileRemove(file.name)}
                        className="p-1 rounded-full hover:bg-red-200 text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                className="px-6 py-3 bg-white/50 text-gray-800 rounded-lg shadow-md hover:bg-white/80 transition-all duration-300 font-semibold"
              >
                Clear
              </button>
              <button 
                type="submit" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
      
      {/* Placeholder for the purple button in the corner */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
          <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}