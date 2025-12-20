import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Trash2 } from 'lucide-react';

// Changed name from CalendarApp to Calender to match the export
const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'All Day Event',
      start: new Date().toISOString().split('T')[0] + 'T00:00',
      end: new Date().toISOString().split('T')[0] + 'T23:59',
      color: '#f59e0b',
      description: ''
    },
    {
      id: '2',
      title: 'Long Event',
      start: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T00:00',
      end: new Date(Date.now() + 259200000).toISOString().split('T')[0] + 'T23:59',
      color: '#10b981',
      description: ''
    },
    {
      id: '3',
      title: 'Meeting',
      start: new Date(Date.now() + 172800000).toISOString().split('T')[0] + 'T10:30',
      end: new Date(Date.now() + 172800000).toISOString().split('T')[0] + 'T11:30',
      color: '#3b82f6',
      description: ''
    },
    {
      id: '4',
      title: 'Lunch',
      start: new Date().toISOString().split('T')[0] + 'T12:00',
      end: new Date().toISOString().split('T')[0] + 'T13:00',
      color: '#fb923c',
      description: ''
    },
    {
      id: '5',
      title: 'Birthday Party',
      start: new Date(Date.now() + 345600000).toISOString().split('T')[0] + 'T07:00',
      end: new Date(Date.now() + 345600000).toISOString().split('T')[0] + 'T10:00',
      color: '#ef4444',
      description: ''
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#f59e0b');
  const [draggedEvent, setDraggedEvent] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: ''
  });

  const draggableEvents = [
    { title: 'Team Meeting', duration: 60, color: '#f59e0b', className: 'bg-gradient-to-r from-orange-500 to-orange-400' },
    { title: 'Project Review', duration: 120, color: '#fb923c', className: 'bg-gradient-to-r from-orange-400 to-amber-400' },
    { title: 'Client Call', duration: 30, color: '#ef4444', className: 'bg-gradient-to-r from-red-500 to-red-400' },
    { title: 'Workshop', duration: 90, color: '#10b981', className: 'bg-gradient-to-r from-emerald-500 to-emerald-400' },
    { title: 'Training Session', duration: 60, color: '#3b82f6', className: 'bg-gradient-to-r from-blue-500 to-blue-400' },
    { title: 'Design Sprint', duration: 120, color: '#8b5cf6', className: 'bg-gradient-to-r from-purple-500 to-purple-400' }
  ];

  const colorOptions = [
    { color: '#f59e0b', bg: 'bg-orange-500' },
    { color: '#fb923c', bg: 'bg-orange-400' },
    { color: '#ef4444', bg: 'bg-red-500' },
    { color: '#10b981', bg: 'bg-emerald-500' },
    { color: '#3b82f6', bg: 'bg-blue-500' },
    { color: '#8b5cf6', bg: 'bg-purple-500' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDay = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventStart = new Date(event.start).toISOString().split('T')[0];
      const eventEnd = new Date(event.end).toISOString().split('T')[0];
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };

  const getTodayEventsCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate === today;
    }).length;
  };

  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    // FIX 1: Added backticks here
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date) => {
    if (!date) return;
    setCurrentEvent(null);
    const startDate = new Date(date);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(10, 0, 0, 0);
    
    setFormData({
      title: '',
      description: '',
      start: formatDateTimeLocal(startDate),
      end: formatDateTimeLocal(endDate)
    });
    setSelectedColor('#f59e0b');
    setIsModalOpen(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start: formatDateTimeLocal(event.start),
      end: formatDateTimeLocal(event.end)
    });
    setSelectedColor(event.color);
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!formData.title || !formData.start) {
      alert('Please fill in the required fields');
      return;
    }

    if (currentEvent) {
      setEvents(events.map(evt => 
        evt.id === currentEvent.id 
          ? { ...evt, ...formData, color: selectedColor }
          : evt
      ));
    } else {
      const newEvent = {
        id: Date.now().toString(),
        ...formData,
        color: selectedColor
      };
      setEvents([...events, newEvent]);
    }

    closeModal();
  };

  const handleDeleteEvent = () => {
    // FIX 2: Added backticks here
    if (currentEvent && window.confirm(`Are you sure you want to delete "${currentEvent.title}"?`)) {
      setEvents(events.filter(evt => evt.id !== currentEvent.id));
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setFormData({ title: '', description: '', start: '', end: '' });
  };

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (date) => {
    if (!draggedEvent || !date) return;
    
    const startDate = new Date(date);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + draggedEvent.duration);

    const newEvent = {
      id: Date.now().toString(),
      title: draggedEvent.title,
      start: startDate.toISOString().slice(0, 16),
      end: endDate.toISOString().slice(0, 16),
      color: draggedEvent.color,
      description: ''
    };

    setEvents([...events, newEvent]);
    setDraggedEvent(null);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-gray-200 to-gray-400 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Calendar</h1>
          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carla" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold text-gray-800">Carla Sanford</span>
          </div>
        </div>

        {/* Calendar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Stats Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{events.length}</div>
                  <div className="text-sm text-gray-600 font-semibold">Total Events</div>
                </div>
                <div className="bg-white/50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{getTodayEventsCount()}</div>
                  <div className="text-sm text-gray-600 font-semibold">Today</div>
                </div>
              </div>
            </div>

            {/* Draggable Events */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Draggable Events</h3>
              <div className="flex flex-col gap-3">
                {draggableEvents.map((event, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(event)}
                    // FIX 3: Added backticks here
                    className={`${event.className} px-4 py-3 rounded-xl cursor-move font-semibold text-sm text-white shadow-md hover:translate-x-1 hover:shadow-lg transition-all select-none`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong className="text-gray-800">Today:</strong> {getTodayEventsCount()} events</p>
                <p><strong className="text-gray-800">This Week:</strong> {events.length} events</p>
                <p><strong className="text-gray-800">This Month:</strong> {events.length} events</p>
              </div>
            </div>
          </div>

          {/* Main Calendar */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-white/40 shadow-xl order-1 lg:order-2">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleToday}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Today
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white/50 rounded-2xl overflow-hidden">
              {/* Day Names */}
              <div className="grid grid-cols-7 bg-white/70">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center font-bold text-gray-800 text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-px bg-gray-300/50">
                {days.map((date, index) => {
                  const dayEvents = getEventsForDay(date);
                  return (
                    <div
                      key={index}
                      onClick={() => handleDayClick(date)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(date)}
                      className={`min-h-24 p-2 bg-white/70 cursor-pointer hover:bg-orange-50/50 transition-all ${
                        isToday(date) ? 'bg-orange-100/70' : ''
                      } ${!date ? 'bg-gray-100/30' : ''}`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-semibold mb-1 ${
                            isToday(date) ? 'text-orange-600' : 'text-gray-700'
                          }`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                onClick={(e) => handleEventClick(event, e)}
                                className="text-xs px-2 py-1 rounded text-white font-semibold truncate hover:opacity-90 transition-all"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-600 font-semibold px-2">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-2xl max-w-lg w-full animate-[modalSlideIn_0.3s_ease]">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {currentEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add description (optional)"
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all min-h-20 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Event Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {colorOptions.map((option) => (
                    <div
                      key={option.color}
                      onClick={() => setSelectedColor(option.color)}
                      className={`${option.bg} h-10 rounded-lg cursor-pointer border-4 transition-all hover:scale-110 ${
                        selectedColor === option.color ? 'border-gray-800 scale-110' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={closeModal}
                className="flex-1 px-6 py-3 bg-gray-500/20 text-gray-800 rounded-xl font-semibold hover:bg-gray-500/30 transition-all"
              >
                Cancel
              </button>
              {currentEvent && (
                <button
                  onClick={handleDeleteEvent}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              )}
              <button
                onClick={handleSaveEvent}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Calender;