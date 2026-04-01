import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Briefcase, BarChart3, ChevronRight } from 'lucide-react';
import { useAuthStore, roles } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const demoUsers = [
  { id: 'admin', name: 'Alexander Wright', role: roles.SUPER_ADMIN, icon: Shield, color: 'from-indigo-500 to-blue-600', desc: 'Full System Access' },
  { id: 'manager', name: 'Sarah Jenkins', role: roles.MANAGER, icon: BarChart3, color: 'from-cyan-500 to-teal-500', desc: 'Team & Performance' },
  { id: 'staff', name: 'Michael Chen', role: roles.STAFF, icon: User, color: 'from-violet-500 to-purple-600', desc: 'Operations & Data' },
  { id: 'underwriter', name: 'Emily Davis', role: roles.UNDERWRITER, icon: Briefcase, color: 'from-blue-500 to-cyan-600', desc: 'Review & Approvals' },
];

export function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    login(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-slate-900">
      {/* Animated Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-primary to-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-primary/20 rotate-12">
            <Shield className="text-white w-10 h-10 -rotate-12" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">SecureCRM Portal</h1>
          <p className="text-slate-400 text-lg">Next-generation Insurance Management System</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {demoUsers.map((user, idx) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin(user)}
              className="glass p-6 rounded-3xl flex items-center gap-6 group relative overflow-hidden text-left"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${user.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                <user.icon size={28} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">{user.name}</h3>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{user.role}</p>
                <p className="text-slate-500 text-sm mt-1">{user.desc}</p>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white/60 group-hover:bg-white/10 transition-all">
                <ChevronRight size={20} />
              </div>
              
              {/* Subtle light effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-slate-500 text-sm"
        >
          Note: This is a demo mode. Select a profile to simulate login experience.
        </motion.p>
      </div>
    </div>
  );
}
