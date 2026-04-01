import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Search, Plus, Filter, Mail, Phone, MapPin, User, ArrowRight, MoreVertical, Globe, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  { id: 'CON-001', name: 'James Wilson', role: 'CTO', company: 'Apex Logistics', email: 'j.wilson@apex.com', phone: '+1 212-555-4567', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'CON-002', name: 'Sarah Miller', role: 'CEO', company: 'Global Tech Solutions', email: 'sarah@globaltech.com', phone: '+1 415-555-0123', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'CON-003', name: 'Emily Chen', role: 'Operations', company: 'Nova Healthcare', email: 'emily.c@nova.org', phone: '+1 312-555-8901', status: 'Contacted', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: 'CON-004', name: 'Michael Brown', role: 'Founder', company: 'Peak Financial', email: 'mbrown@peak.com', phone: '+1 617-555-2345', status: 'Inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
];

export function Contacts() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Contacts</h1>
          <p className="text-slate-500 font-medium italic">Relationship Management & Connections</p>
        </div>
        <button className="gradient-btn font-bold flex items-center gap-2">
          <Plus size={18} />
          New Contact
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contacts.map((c, i) => (
          <motion.div 
            key={c.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="premium-card p-6 flex flex-col items-center text-center group cursor-pointer relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-slate-400 hover:text-primary"><MoreVertical size={18} /></button>
            </div>
            
            <div className="w-20 h-20 rounded-full border-4 border-slate-50 overflow-hidden mb-4 shadow-sm group-hover:border-primary/20 transition-all">
              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{c.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{c.role} @ {c.company}</p>
            
            <div className="w-full space-y-3 mb-6">
               <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                 <Mail size={14} className="text-slate-300" />
                 {c.email}
               </div>
               <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                 <Phone size={14} className="text-slate-300" />
                 {c.phone}
               </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50 w-full justify-center">
              <span className={twMerge(
                "px-2 py-0.5 rounded text-[10px] font-bold tracking-tighter uppercase border",
                c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                c.status === 'Contacted' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' : 'bg-slate-100 text-slate-400 border-slate-200'
              )}>
                {c.status}
              </span>
            </div>
            
            <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white transition-all transform translate-x-4 group-hover:translate-x-0">
               <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Helper for tailwind-merge (already imported at top)
