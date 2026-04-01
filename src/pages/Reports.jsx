import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, FileText, Filter, Calendar, Share2 } from 'lucide-react';

const data = [
  { month: 'Jan', revenue: 4000, claims: 240 },
  { month: 'Feb', revenue: 3000, claims: 198 },
  { month: 'Mar', revenue: 2000, claims: 980 },
  { month: 'Apr', revenue: 2780, claims: 390 },
  { month: 'May', revenue: 1890, claims: 480 },
  { month: 'Jun', revenue: 2390, claims: 380 },
];

export function Reports() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Analytics & Reports</h1>
          <p className="text-slate-500 font-medium">Enterprise Data Intelligence Overview</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
            <Calendar size={18} />
            Period: Last 6 Months
          </button>
          <button className="gradient-btn flex items-center gap-2 font-bold">
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Monthly Revenue Stream</h3>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Filter size={18} /></button>
              <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Share2 size={18} /></button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Reports</h3>
          <div className="space-y-4">
            {[
              { t: 'Q3 Financial Audit', d: 'Oct 28', s: '2.4 MB' },
              { t: 'Monthly Claims Summary', d: 'Oct 20', s: '1.1 MB' },
              { t: 'Agent Performance Index', d: 'Oct 15', s: '840 KB' },
              { t: 'Policy Renewal Forecast', d: 'Oct 10', s: '3.2 MB' },
            ].map((rep, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors border border-slate-100">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{rep.t}</h5>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rep.d}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{rep.s}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/20">
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
}
