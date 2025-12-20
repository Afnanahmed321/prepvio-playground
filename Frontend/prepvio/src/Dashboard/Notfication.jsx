import React, { useState } from "react";
import { Bell, Check, X, Trash2, CheckCheck } from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Prepvio!",
      message: "Chal aja bhidu, let's start your learning journey together!",
      timestamp: "2 hours ago",
      read: false,
      type: "info"
    },
    {
      id: 2,
      title: "New Course Available",
      message: "Check out the new Web Development course we just added!",
      timestamp: "5 hours ago",
      read: false,
      type: "success"
    },
    {
      id: 3,
      title: "Subscription Reminder",
      message: "Your premium subscription will expire in 3 days.",
      timestamp: "1 day ago",
      read: true,
      type: "warning"
    },
    {
      id: 4,
      title: "Achievement Unlocked",
      message: "Congratulations! You've completed 10 courses. Keep it up!",
      timestamp: "2 days ago",
      read: true,
      type: "success"
    },
    {
      id: 5,
      title: "New Message",
      message: "You have a new message from support team.",
      timestamp: "3 days ago",
      read: false,
      type: "info"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationColor = (type, read) => {
    if (read) return "bg-white/30";
    
    switch(type) {
      case "success":
        return "bg-green-100/50";
      case "warning":
        return "bg-yellow-100/50";
      case "error":
        return "bg-red-100/50";
      default:
        return "bg-indigo-100/50";
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden p-6">
      <div className="flex-1">
        <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg flex flex-col h-full transition-all duration-300">
          
          <div className="p-6 border-b border-white/50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-6 h-6 text-indigo-600" />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h2>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bell className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm">You're all caught up, bhidu!</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-2xl ${getNotificationColor(notif.type, notif.read)} backdrop-blur-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg ${
                    !notif.read ? "border-l-4 border-indigo-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-base font-semibold text-gray-900">
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notif.timestamp}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-white/30 transition"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notif.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-white/30 transition"
                        title="Delete"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;