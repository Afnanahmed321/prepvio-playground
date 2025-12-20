import React from "react";
import { 
  TrendingUp, TrendingDown, Package, Users, DollarSign, ShoppingCart, ArrowUp, ArrowDown, 
  Eye,
  Gift,
  User
} from "lucide-react";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Stat Card Component
const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className={`flex items-center text-sm font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        {change}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
    <p className="text-sm text-slate-600">{title}</p>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children, info }) => (
  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      {info && <span className="text-sm text-slate-600">{info}</span>}
    </div>
    {children}
  </div>
);

export default function StatisticsDashboard() {
  // Sample Data
  const monthlyData = [
    { month: 'Jan', earnings: 4000, expenses: 2400, visitors: 2400 },
    { month: 'Feb', earnings: 3000, expenses: 1398, visitors: 2210 },
    { month: 'Mar', earnings: 2000, expenses: 9800, visitors: 2290 },
    { month: 'Apr', earnings: 2780, expenses: 3908, visitors: 2000 },
    { month: 'May', earnings: 1890, expenses: 4800, visitors: 2181 },
    { month: 'Jun', earnings: 2390, expenses: 3800, visitors: 2500 },
    { month: 'Jul', earnings: 3490, expenses: 4300, visitors: 2100 },
  ];

  const salesData = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 60 },
    { name: 'Fri', value: 40 },
    { name: 'Sat', value: 80 },
    { name: 'Sun', value: 55 },
  ];

  const productData = [
    { name: 'React Native', percentage: 85, color: 'from-blue-500 to-indigo-600' },
    { name: 'Figma', percentage: 70, color: 'from-purple-500 to-pink-600' },
    { name: 'Bootstrap 5', percentage: 60, color: 'from-emerald-500 to-teal-600' },
    { name: 'Shopify', percentage: 45, color: 'from-orange-500 to-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-rose-200 to-slate-300 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Statistics Dashboard</h1>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Visitors"
            value="8,549"
            change="+15.3%"
            trend="up"
            icon={Users}
            color="from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Window shopper"
            value="1,245"
            change="+8.2%"
            trend="up"
            icon={Eye}
            color="from-emerald-500 to-teal-600"
          />
          <StatCard
            title="Free Trials"
            value="$45,890"
            change="+12.5%"
            trend="up"
            icon={Gift}
            color="from-purple-500 to-pink-600"
          />
          <StatCard
            title="Daily Visitors"
            value="3,254"
            change="-3.1%"
            trend="down"
            icon={Users}
            color="from-orange-500 to-rose-600"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-2">Premium Users</p>
                <h3 className="text-3xl font-bold text-slate-800">+18.5%</h3>
                <p className="text-xs text-emerald-600 mt-2">More than last month</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-2">Parcel in the way</p>
                <h3 className="text-3xl font-bold text-slate-800">486</h3>
                <p className="text-xs text-blue-600 mt-2">+15% last month</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-2">Return Orders</p>
                <h3 className="text-3xl font-bold text-slate-800">125</h3>
                <p className="text-xs text-rose-600 mt-2">-8% from last week</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Earnings vs Expenses" info="Last 7 months">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="earnings" stroke="#6366f1" fillOpacity={1} fill="url(#earnings)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fillOpacity={1} fill="url(#expenses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Sales" info="Last 7 days">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Product Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Visitors Trend" info="Monthly overview">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Product Performance" info="Sales by product">
            <div className="space-y-4">
              {productData.map((product, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{product.name}</span>
                    <span className="text-sm font-bold text-slate-800">{product.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${product.color} rounded-full transition-all duration-500`}
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}