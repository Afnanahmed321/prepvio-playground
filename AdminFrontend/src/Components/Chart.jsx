import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Activity, Award, Clock, Eye } from 'lucide-react';

const ChartWidgets = () => {
  // Delivery Orders Data
  const deliveryData = [
    { day: 'Mon', orders: 30, target: 40 },
    { day: 'Tue', orders: 45, target: 40 },
    { day: 'Wed', orders: 35, target: 40 },
    { day: 'Thu', orders: 50, target: 40 },
    { day: 'Fri', orders: 42, target: 40 },
    { day: 'Sat', orders: 38, target: 40 },
    { day: 'Sun', orders: 48, target: 40 }
  ];

  // Sales Data
  const salesData = [
    { month: 'Jan', value: 3000 },
    { month: 'Feb', value: 4500 },
    { month: 'Mar', value: 3200 },
    { month: 'Apr', value: 5100 },
    { month: 'May', value: 4200 },
    { month: 'Jun', value: 6000 }
  ];

  // Invoiced Data
  const invoicedData = [
    { week: 'W1', amount: 2400 },
    { week: 'W2', amount: 1398 },
    { week: 'W3', amount: 9800 },
    { week: 'W4', amount: 3908 }
  ];

  // Profit Data
  const profitData = [
    { quarter: 'Q1', profit: 4000, expense: 2400 },
    { quarter: 'Q2', profit: 3000, expense: 1398 },
    { quarter: 'Q3', profit: 2000, expense: 9800 },
    { quarter: 'Q4', profit: 2780, expense: 3908 }
  ];

  // Expenses Data
  const expensesData = [
    { category: 'Marketing', amount: 4300 },
    { category: 'Development', amount: 6200 },
    { category: 'Operations', amount: 3100 },
    { category: 'Sales', amount: 5400 },
    { category: 'Support', amount: 2800 }
  ];

  // Online Store Performance
  const storePerformanceData = [
    { time: '12am', visitors: 120 },
    { time: '4am', visitors: 80 },
    { time: '8am', visitors: 200 },
    { time: '12pm', visitors: 350 },
    { time: '4pm', visitors: 400 },
    { time: '8pm', visitors: 280 },
    { time: '11pm', visitors: 150 }
  ];

  // Category Distribution
  const categoryData = [
    { name: 'Apps', value: 34, color: '#f59e0b' },
    { name: 'Widgets', value: 22, color: '#fb923c' },
    { name: 'Forms', value: 18, color: '#fdba74' },
    { name: 'Components', value: 15, color: '#fcd34d' },
    { name: 'Pages', value: 11, color: '#fde68a' }
  ];

  // Performance Metrics
  const performanceMetrics = [
    { subject: 'Sales', A: 120, fullMark: 150 },
    { subject: 'Marketing', A: 98, fullMark: 150 },
    { subject: 'Development', A: 86, fullMark: 150 },
    { subject: 'Support', A: 99, fullMark: 150 },
    { subject: 'Operations', A: 85, fullMark: 150 }
  ];

  const StatCard = ({ icon: Icon, title, value, change, isPositive, bgColor }) => (
    <div className="rounded-2xl p-6 backdrop-blur-md bg-white/70 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const ChartCard = ({ title, subtitle, children }) => (
    <div className="rounded-2xl p-6 backdrop-blur-md bg-white/70 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, #d4a574 0%, #c9c9c9 50%, #9ca3af 100%)'
    }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Chart Widgets</h1>
        <p className="text-gray-600">Comprehensive collection of chart components</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={ShoppingCart} 
          title="Total Order" 
          value="3,456" 
          change="+12.5%"
          isPositive={true}
          bgColor="bg-gradient-to-br from-orange-500 to-amber-600"
        />
        <StatCard 
          icon={Clock} 
          title="Avg. time spent" 
          value="4h 35m" 
          change="+8.2%"
          isPositive={true}
          bgColor="bg-gradient-to-br from-amber-600 to-orange-700"
        />
        <StatCard 
          icon={Eye} 
          title="New visitor" 
          value="2,845" 
          change="-3.8%"
          isPositive={false}
          bgColor="bg-gradient-to-br from-orange-600 to-amber-700"
        />
        <StatCard 
          icon={Award} 
          title="Total Rewards" 
          value="$15,240" 
          change="+18.9%"
          isPositive={true}
          bgColor="bg-gradient-to-br from-amber-700 to-orange-800"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Delivery Orders */}
        <ChartCard title="Delivery Orders" subtitle="Weekly delivery statistics">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sales */}
        <ChartCard title="Sales" subtitle="Monthly sales overview">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#f59e0b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Invoiced */}
        <ChartCard title="Invoiced" subtitle="Weekly invoice amounts">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={invoicedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#fb923c" 
                strokeWidth={3}
                dot={{ fill: '#fb923c', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Profit */}
        <ChartCard title="Profit" subtitle="Quarterly profit vs expenses">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Expenses */}
        <ChartCard title="Expenses" subtitle="Category breakdown">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={expensesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis dataKey="category" type="category" tick={{ fill: '#6b7280', fontSize: 11 }} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="amount" fill="#f59e0b" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Extended Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Online Store */}
        <ChartCard 
          title="Online store" 
          subtitle="your team performance is 5% better this week"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={storePerformanceData}>
              <defs>
                <linearGradient id="colorStore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorStore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Performance Metrics */}
        <ChartCard title="Performance Metrics" subtitle="Overall team performance">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={performanceMetrics}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Radar 
                name="Performance" 
                dataKey="A" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completed Percentage */}
        <ChartCard title="Completed" subtitle="Project completion rate">
          <div className="flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Completed', value: 56, fill: '#10b981' },
                      { name: 'Remaining', value: 44, fill: '#e5e7eb' }
                    ]}
                    cx={100}
                    cy={100}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800">56</div>
                  <div className="text-sm text-gray-600">Percentage</div>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Category Distribution */}
        <ChartCard title="Category Distribution" subtitle="Resource allocation">
          <div className="flex items-center justify-around">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Bitcoin Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Bitcoin</h3>
            <div className="text-3xl">₿</div>
          </div>
          <div className="mb-6">
            <div className="text-sm opacity-90 mb-1">Total Tasks</div>
            <div className="text-5xl font-bold">0.73%</div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/30">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm">Current Value</span>
              <span className="text-lg font-bold">$48,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">24h Change</span>
              <span className="text-sm text-green-200 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +2.4%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartWidgets;