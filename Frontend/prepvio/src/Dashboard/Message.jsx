import React, { useState } from "react";
import { Paperclip, Smile, Send, MessageCircle } from "lucide-react";

function Message() {
  const [newMessages, setNewMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");

  const handleSendMessage = () => {
    if (newMessageText.trim()) {
      const sender = "CurrentUser";
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const message = {
        id: newMessages.length + 101,
        sender,
        text: newMessageText,
        timestamp,
      };
      setNewMessages([...newMessages, message]);
      setNewMessageText("");
    }
  };

  return (
    <div className="flex h-screen  overflow-x-hidden p-6">
      <div className="flex-1">
        {/* Main Glassy Container */}
        <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg flex flex-col h-full transition-all duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-indigo-600" />
              Messages
            </h2>
          </div>

          {/* Messages List */}
          <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
            {/* Example static messages */}
            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-sm text-gray-800 self-start max-w-[80%] shadow-md">
              <p className="text-sm font-medium">Prepvio</p>
              <p className="text-base">
                Welcome to Prepvio Bhidu, Chal aja baat chit karte hai sab thik!
              </p>
              <p className="text-xs text-gray-500 mt-1 text-right">10:00 AM</p>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-100/50 backdrop-blur-sm text-gray-800 self-end max-w-[80%] shadow-md">
              <p className="text-sm font-medium">You</p>
              <p className="text-base">
                Hi! I have a question about my recent subscription plan.
              </p>
              <p className="text-xs text-gray-500 mt-1 text-right">10:05 AM</p>
            </div>

            {/* Dynamic Messages */}
            {newMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-2xl backdrop-blur-sm shadow-md max-w-[80%] ${
                  msg.sender === "CurrentUser"
                    ? "bg-indigo-100/50 self-end text-gray-800 ml-auto"
                    : "bg-white/50 self-start text-gray-800 mr-auto"
                }`}
              >
                <p className="text-sm font-medium">
                  {msg.sender === "CurrentUser" ? "You" : msg.sender}
                </p>
                <p className="text-base">{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {msg.timestamp}
                </p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/50 bg-white/30 backdrop-blur-2xl rounded-b-3xl flex items-center gap-2 shadow-inner">
            <textarea
              placeholder="Type kar bhidu..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="flex-1 bg-white/50 backdrop-blur-sm border border-white/50 text-gray-800 min-h-[2.5rem] resize-none rounded-2xl p-3 placeholder-gray-500 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              type="button"
              className="text-gray-500 p-2 rounded-full hover:bg-white/20 transition"
              title="Attach File"
            >
              <Paperclip className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="text-gray-500 p-2 rounded-full hover:bg-white/20 transition"
              title="Add Emoji"
            >
              <Smile className="w-6 h-6" />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 disabled:opacity-50"
              disabled={!newMessageText.trim()}
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
