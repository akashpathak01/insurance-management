import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Search, Filter, Plus, MoreHorizontal, User, Mail, Phone, MapPin, ChevronRight, Share2, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const accounts = [
  { id: 'ACC-1001', name: 'Global Tech Solutions', type: 'Enterprise', contact: 'Sarah Miller', email: 'sarah@globaltech.com', phone: '+1 415-555-0123', status: 'Active', value: '$450,000' },
  { id: 'ACC-1002', name: 'Apex Logistics', type: 'Mid-Market', contact: 'James Wilson', email: 'j.wilson@apex.com', phone: '+1 212-555-4567', status: 'Pending', value: '$85,000' },
  { id: 'ACC-1003', name: 'Nova Healthcare', type: 'Enterprise', contact: 'Emily Chen', email: 'emily.c@nova.org', phone: '+1 312-555-8901', status: 'Active', value: '$1.2M' },
  { id: 'ACC-1004', name: 'Peak Financial', type: 'Small Business', contact: 'Michael Brown', email: 'mbrown@peak.com', phone: '+1 617-555-2345', status: 'Inactive', value: '$12,000' },
  { id: 'ACC-1005', name: 'Summit Retail', type: 'Mid-Market', contact: 'Laura White', email: 'laura@summit.io', phone: '+1 512-555-6789', status: 'Active', value: '$320,000' },
];

export function Accounts() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Accounts</h1>
          <p className="text-slate-500 font-medium">Manage your {accounts.length} enterprise partnerships</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
            <Share2 size={18} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all font-bold shadow-lg shadow-primary/20">
            <Plus size={18} />
            Add Account
          </button>
        </div>
      </div>

      <div className="premium-card p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or primary contact..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-bold">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Account & Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Value</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {accounts.map((acc, i) => (
                <motion.tr 
                  key={acc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 group transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {acc.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          {acc.name}
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 font-mono tracking-tighter">{acc.id}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <User size={12} /> {acc.contact}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">{acc.type}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400" /> {acc.email}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" /> {acc.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      acc.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      acc.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-slate-100 text-slate-400 border border-slate-200'
                    )}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-800 font-mono italic">
                    {acc.value}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"><Edit2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"><Trash2 size={16} /></button>
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"><ChevronRight size={18} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-50 flex items-center justify-between mt-4">
          <div className="text-sm text-slate-400 font-medium italic">Showing <b>1-5</b> of {accounts.length} results</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-sm font-bold cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-bold transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper for clsx (already imported at top)
