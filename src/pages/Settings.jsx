import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Key, Globe, Layout, Smartphone, Mail, Save, Clock, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const settingSections = [
  { id: 'profile', label: 'Organization Profile', icon: Globe, desc: 'Public business identity and contact info' },
  { id: 'security', label: 'Security & Access', icon: Key, desc: 'Passwords, MFA, and device management' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Configure email, push, and SMS alerts' },
  { id: 'system', label: 'System Preferences', icon: Layout, desc: 'Language, timezone, and appearance' },
  { id: 'compliance', label: 'Compliance', icon: Shield, desc: 'Data retention, GDPR, and privacy controls' },
];

export function Settings() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 font-medium italic">Global CRM Configuration</p>
        </div>
        <button className="gradient-btn flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          {settingSections.map((sec) => (
            <button 
              key={sec.id}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all group ${sec.id === 'profile' ? 'bg-primary/5 text-primary border border-primary/20' : 'text-slate-500 hover:bg-slate-50 border border-transparent'}`}
            >
              <sec.icon size={20} className={sec.id === 'profile' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'} />
              <div>
                <div className="text-sm font-bold uppercase tracking-widest">{sec.label}</div>
                <div className="text-[10px] opacity-70 group-hover:opacity-100">{sec.desc}</div>
              </div>
            </button>
          ))}
          
          <div className="pt-8 px-4">
             <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs mb-2 uppercase tracking-widest">
                  <HelpCircle size={14} /> Need Help?
                </div>
                <p className="text-[10px] text-amber-500">Contact enterprise support for advanced system overrides.</p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
           <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4 flex items-center gap-3">
                 <Globe size={24} className="text-primary" /> Organization Profile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name</label>
                   <input type="text" defaultValue="Secure Insurance Corp." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Domain</label>
                   <input type="text" defaultValue="securecrm.io" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700" />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Headquarters Address</label>
                   <textarea defaultValue="120 Corporate Pl, Suite 400, Financial District, SF, CA 94105" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 h-24 resize-none" />
                 </div>
              </div>
           </div>

           <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4 flex items-center gap-3">
                 <Shield size={24} className="text-rose-500" /> Security Controls
              </h3>
              
              <div className="space-y-6">
                 {[
                   { l: 'Enforce MFA', d: 'Require two-factor authentication for all users.', s: true },
                   { l: 'Session Timeout', d: 'Automatically sign out users after 2 hours of inactivity.', s: true },
                   { l: 'Restrict IP Access', d: 'Limit CRM access to defined office IP ranges.', s: false },
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border border-slate-50 rounded-2xl hover:bg-slate-50/50 transition-all">
                      <div>
                        <div className="text-sm font-bold text-slate-800 uppercase tracking-widest">{opt.l}</div>
                        <div className="text-xs text-slate-500">{opt.d}</div>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${opt.s ? 'bg-primary' : 'bg-slate-200'}`}>
                         <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${opt.s ? 'right-1' : 'left-1'}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
