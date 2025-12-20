import React from 'react';
import { 
  Home, 
  ChevronRight, 
  BookOpen, 
  SquareDot, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Mock Data ---
const mockDashboardData = {
  supportRequests: {
    total: 350,
    description: "Total number of support requests that come in.",
    open: 10,
    running: 5,
    solved: 3,
    chartData: [10, 5, 3], // Simplified for example, actual chart would be more dynamic
    color: "bg-gradient-to-r from-blue-400 to-blue-600"
  },
  agentResponse: {
    total: 500,
    description: "Total number of support requests that come in.",
    open: 50,
    running: 75,
    solved: 30,
    chartData: [50, 75, 30],
    color: "bg-gradient-to-r from-green-400 to-green-600"
  },
  supportResolved: {
    total: 800,
    description: "Total number of support requests that come in.",
    open: 80,
    running: 60,
    solved: 90,
    chartData: [80, 60, 90],
    color: "bg-gradient-to-r from-teal-400 to-teal-600"
  },
  customerSatisfaction: {
    data: {
      labels: ['Very Poor', 'Satisfied', 'Poor', 'Excellent'],
      datasets: [
        {
          data: [12.5, 37.5, 25.0, 25.0], // Percentages
          backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'], // Red, Orange, Blue, Green
          hoverOffset: 4,
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'rgb(55, 65, 81)'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += context.parsed + '%';
              }
              return label;
            }
          }
        }
      }
    }
  },
  latestActivity: [
    { type: 'pending', text: 'You have 3 pending tasks.', time: 'Just Now', icon: <AlertCircle className="w-4 h-4 text-orange-500" /> },
    { type: 'newOrder', text: 'New order received', time: 'Just Now', icon: <ShoppingCart className="w-4 h-4 text-blue-500" /> },
    { type: 'pending', text: 'You have 3 pending tasks.', time: 'Just Now', icon: <AlertCircle className="w-4 h-4 text-orange-500" /> },
    { type: 'newOrder', text: 'New order received', time: 'Just Now', icon: <ShoppingCart className="w-4 h-4 text-blue-500" /> },
    { type: 'pending', text: 'You have 3 pending tasks.', time: 'Just Now', icon: <AlertCircle className="w-4 h-4 text-orange-500" /> },
    { type: 'newOrder', text: 'New order received', time: 'Just Now', icon: <ShoppingCart className="w-4 h-4 text-blue-500" /> },
  ],
  facebookSource: { pageProfile: 70, favorite: 85, likeStory: 50 },
  twitterSource: { wallProfile: 60, favorite: 90, likeTweets: 45 },
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
          <a href="#" className="ml-1 text-gray-100 hover:text-white md:ml-2">Helpdesk</a>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <span className="ml-1 text-gray-300 md:ml-2">Dashboard</span>
        </div>
      </li>
    </ol>
  </nav>
);

// --- Stat Card Component ---
const StatCard = ({ total, description, open, running, solved, color }) => (
  <GlassCard className="col-span-1 flex flex-col justify-between">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{total}</h2>
      <p className="text-gray-700 text-sm mt-1">{description}</p>
    </div>
    
    {/* Placeholder for the chart wave */}
    <div className={`w-full h-20 rounded-lg mt-4 ${color} flex items-end justify-around p-2 text-white text-xs font-semibold`}>
      <div className="flex flex-col items-center">
        <span>{open}</span>
        <span>Open</span>
      </div>
      <div className="flex flex-col items-center">
        <span>{running}</span>
        <span>Running</span>
      </div>
      <div className="flex flex-col items-center">
        <span>{solved}</span>
        <span>Solved</span>
      </div>
    </div>
  </GlassCard>
);

// --- Progress Bar Component ---
const ProgressBar = ({ label, value, color }) => (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-800 mb-1">{label}</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

// --- Main App Component ---
export default function HDashboard() {
  const appStyle = {
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={appStyle} className="font-inter flex min-h-screen p-6">
      <div className="flex-1 max-w-7xl mx-auto">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            total={mockDashboardData.supportRequests.total}
            description={mockDashboardData.supportRequests.description}
            open={mockDashboardData.supportRequests.open}
            running={mockDashboardData.supportRequests.running}
            solved={mockDashboardData.supportRequests.solved}
            color="bg-blue-500/80" // Using a solid color for the wave placeholder
          />
          <StatCard 
            total={mockDashboardData.agentResponse.total}
            description={mockDashboardData.agentResponse.description}
            open={mockDashboardData.agentResponse.open}
            running={mockDashboardData.agentResponse.running}
            solved={mockDashboardData.agentResponse.solved}
            color="bg-green-500/80"
          />
          <StatCard 
            total={mockDashboardData.supportResolved.total}
            description={mockDashboardData.supportResolved.description}
            open={mockDashboardData.supportResolved.open}
            running={mockDashboardData.supportResolved.running}
            solved={mockDashboardData.supportResolved.solved}
            color="bg-teal-500/80"
          />
        </div>

        {/* Mid Section: Customer Satisfaction & Latest Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GlassCard className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
            <p className="text-sm text-gray-700 mb-4">
              It takes continuous effort to maintain high customer satisfaction levels. Internal and external quality measures are often tied together. as the opinion... 
              <a href="#" className="text-indigo-600 hover:underline ml-1">Learn more.</a>
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 flex-shrink-0">
                <Doughnut data={mockDashboardData.customerSatisfaction.data} options={mockDashboardData.customerSatisfaction.options} />
              </div>
              {/* Manual legend to match the screenshot style more closely */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>Very Poor (12.5%)</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>Satisfied (37.5%)</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Poor (25.0%)</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>Excellent (25.0%)</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Latest Activity</h3>
              {/* <MoreVertical className="w-5 h-5 text-gray-500" /> */} {/* More icon, if needed */}
            </div>
            <div className="space-y-4">
              {mockDashboardData.latestActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    {activity.icon}
                    <span>{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 rounded-lg text-indigo-600 font-semibold bg-white/50 hover:bg-white/80 transition-all duration-300">
              View all Feeds
            </button>
          </GlassCard>
        </div>

        {/* Bottom Section: Social Media Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Facebook Source</h3>
            <ProgressBar label="Page Profile" value={mockDashboardData.facebookSource.pageProfile} color="bg-blue-500" />
            <ProgressBar label="Favorite" value={mockDashboardData.facebookSource.favorite} color="bg-red-500" />
            <ProgressBar label="Like Story" value={mockDashboardData.facebookSource.likeStory} color="bg-orange-500" />
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Twitter Source</h3>
            <ProgressBar label="Wall Profile" value={mockDashboardData.twitterSource.wallProfile} color="bg-blue-500" />
            <ProgressBar label="Favorite" value={mockDashboardData.twitterSource.favorite} color="bg-red-500" />
            <ProgressBar label="Like Tweets" value={mockDashboardData.twitterSource.likeTweets} color="bg-orange-500" />
          </GlassCard>

          {/* Bottom right card: Tickets Answered */}
          <GlassCard className="flex flex-col items-start justify-center p-6">
            <BookOpen className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-4xl font-bold text-gray-900">379</h3>
            <p className="text-gray-700 mt-1">Tickets Answered</p>
          </GlassCard>
        </div>
      </div>
      
      {/* Placeholder for the purple button in the corner */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
          <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}