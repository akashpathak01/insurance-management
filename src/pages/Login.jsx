import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Briefcase, BarChart3, ChevronRight, Mail, Lock, ArrowRight, Loader2, Info } from 'lucide-react';
import { useAuthStore, roles } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const demoUsers = [
  { id: 'admin', name: 'Alexander Wright', role: roles.SUPER_ADMIN, icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50', desc: 'System Administrator' },
  { id: 'manager', name: 'Sarah Jenkins', role: roles.MANAGER, icon: BarChart3, color: 'text-cyan-600', bg: 'bg-cyan-50', desc: 'Territory Manager' },
  { id: 'staff', name: 'Michael Chen', role: roles.STAFF, icon: User, color: 'text-violet-600', bg: 'bg-violet-50', desc: 'Case Executive' },
  { id: 'underwriter', name: 'Emily Davis', role: roles.UNDERWRITER, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Risk Analyst' },
];

export function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (user) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      login(user);
      navigate('/');
      setIsLoading(false);
    }, 800);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Default to Admin for demo form sign-in
    handleLogin(demoUsers[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0f1d] relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden z-20">
        
        {/* Left Side: Login Form */}
        <div className="p-10 lg:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Shield size={24} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">SecureCRM</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back.</h1>
            <p className="text-slate-400 font-medium italic">"Securing Futures, Empowering Growth"</p>
          </motion.div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@securecrm.com" 
                  className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full gradient-btn py-4 flex items-center justify-center gap-3 text-lg group shadow-xl shadow-primary/20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5">
             <div className="flex items-center gap-2 text-slate-500 text-xs font-medium bg-white/5 p-3 rounded-xl border border-white/5">
               <Info size={14} className="text-primary" />
               For the demo, clicking "Sign In" uses the Admin account.
             </div>
          </div>
        </div>

        {/* Right Side: Demo Quick Access */}
        <div className="bg-white/5 border-l border-white/5 p-10 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-xl font-bold text-white mb-2">Quick-Access Demo</h2>
            <p className="text-sm text-slate-400">Select a pre-configured role to explore features instantly.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {demoUsers.map((user, idx) => (
              <motion.button
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleLogin(user)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${user.bg} ${user.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <user.icon size={22} />
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-white font-bold text-sm tracking-tight">{user.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${user.color}`}>{user.role}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-500">{user.desc}</span>
                  </div>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={18} />
              </motion.button>
            ))}
          </div>

          <div className="mt-12 text-center">
             <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Enterprise Security Protocol Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
