import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { month: 'Jan', assets: 250000, liabilities: 120000 },
  { month: 'Feb', assets: 260000, liabilities: 118000 },
  { month: 'Mar', assets: 285000, liabilities: 115000 },
  { month: 'Apr', assets: 280000, liabilities: 122000 },
  { month: 'May', assets: 310000, liabilities: 110000 },
  { month: 'Jun', assets: 345000, liabilities: 105000 },
];

const COLORS = ['#4f46e5', '#f43f5e'];

export function NetWorth() {
  const currentAssets = 345000;
  const currentLiabilities = 105000;
  const currentNetWorth = currentAssets - currentLiabilities;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Net Worth Analysis</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-bold">
            <ArrowUpRight size={18} />
            +8.2% vs last month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card p-6 bg-gradient-to-br from-primary to-indigo-700 text-white shadow-primary/20">
          <p className="text-primary-light font-bold uppercase tracking-wider text-xs mb-1">Total Net Worth</p>
          <h2 className="text-4xl font-bold mb-4">${currentNetWorth.toLocaleString()}</h2>
          <div className="flex items-center gap-2 text-primary-light text-sm">
            <TrendingUp size={16} />
            <span>Projected: $300k by end of year</span>
          </div>
        </div>
        
        <div className="premium-card p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Assets</p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={16} /></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">${currentAssets.toLocaleString()}</h2>
          <p className="text-emerald-500 text-xs font-bold mt-1">+12.4% Asset Growth</p>
        </div>

        <div className="premium-card p-6 border-l-4 border-rose-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Liabilities</p>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><TrendingDown size={16} /></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">${currentLiabilities.toLocaleString()}</h2>
          <p className="text-rose-500 text-xs font-bold mt-1">-4.2% Debt Reduction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Asset vs Liability Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="assets" stackId="1" stroke="#4f46e5" strokeWidth={2} fill="#4f46e5" fillOpacity={0.1} />
                <Area type="monotone" dataKey="liabilities" stackId="2" stroke="#f43f5e" strokeWidth={2} fill="#f43f5e" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Allocation Mix</h3>
          <div className="h-80 flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={[
                    { name: 'Investments', value: 150000 },
                    { name: 'Real Estate', value: 120000 },
                    { name: 'Cash', value: 75000 },
                  ]} 
                  cx="50%" cy="50%" 
                  innerRadius={60} 
                  outerRadius={100} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  <Cell fill="#4f46e5" />
                  <Cell fill="#06b6d4" />
                  <Cell fill="#8b5cf6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-8 mt-4">
               {[
                { l: 'Investments', v: '43%', c: 'bg-primary' },
                { l: 'Real Estate', v: '35%', c: 'bg-secondary' },
                { l: 'Cash', v: '22%', c: 'bg-violet-500' },
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <div className="flex items-center gap-2 mb-1">
                     <span className={`w-3 h-3 rounded-full ${item.c}`}></span>
                     <span className="text-xs font-bold text-slate-700">{item.l}</span>
                   </div>
                   <span className="text-xl font-bold text-slate-800">{item.v}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
