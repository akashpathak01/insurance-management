import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { 
  FileSearch, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Paperclip,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const cases = [
  { 
    id: 'CLM-001', 
    title: 'Vehicle Damage - Front Collision', 
    policy: 'POL-8821', 
    customer: 'Alice Johnson', 
    status: 'In Review',
    step: 2,
    date: 'Oct 24, 2023',
    priority: 'High'
  },
  { 
    id: 'CLM-002', 
    title: 'Water Leak - Property Damage', 
    policy: 'POL-9012', 
    customer: 'Bob Smith', 
    status: 'Approved',
    step: 3,
    date: 'Oct 22, 2023',
    priority: 'Medium'
  },
];

const steps = [
  { id: 1, label: 'New', icon: FileSearch },
  { id: 2, label: 'Review', icon: UserCheck },
  { id: 3, label: 'Decision', icon: CheckCircle2 },
  { id: 4, label: 'Closed', icon: Clock },
];

export function Cases() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Claims Management</h1>
          <p className="text-slate-500 font-medium italic">Status Flow: New → Review → Approved/Rejected → Closed</p>
        </div>
        <button className="gradient-btn">Initiate New Claim</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {cases.map((c, i) => (
          <motion.div 
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card p-6 border-l-4 border-primary"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100">
                  <FileSearch size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">{c.id}</span>
                    <h3 className="text-lg font-bold text-slate-800">{c.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Paperclip size={14} /> {c.policy}</span>
                    <span>•</span>
                    <span>{c.customer}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-lg">
                  <MessageSquare size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-lg">
                  <MoreVertical size={20} />
                </button>
                <div className="h-8 w-px bg-slate-100 mx-2"></div>
                <button className="flex items-center gap-2 font-bold text-primary group">
                  View Detail <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Timeline UI */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
              <div className="flex justify-between items-center px-4 relative">
                {steps.map((step) => {
                  const isCompleted = c.step >= step.id;
                  const isCurrent = c.step === step.id;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-4">
                      <div className={twMerge(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        isCompleted ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-slate-50 text-slate-300 border border-slate-100",
                        isCurrent && "ring-4 ring-primary/20 scale-110"
                      )}>
                        <Icon size={18} />
                      </div>
                      <span className={twMerge(
                        "text-xs font-bold uppercase tracking-widest",
                        isCompleted ? "text-primary" : "text-slate-300"
                      )}>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Helper for tailwind-merge (already imported at top)
