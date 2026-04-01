import React from 'react';
import { Package, Shield, Heart, Car, Activity, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const products = [
  { id: 'PRD-01', name: 'Elite Life Premier', cat: 'Life', desc: 'Comprehensive coverage with investment options.', color: 'border-indigo-500', icon: Shield, bg: 'bg-indigo-50', text: 'text-indigo-600', price: 'From $120/mo' },
  { id: 'PRD-02', name: 'Health Core Plus', cat: 'Health', desc: 'Essential medical coverage for families.', color: 'border-cyan-500', icon: Heart, bg: 'bg-cyan-50', text: 'text-cyan-600', price: 'From $85/mo' },
  { id: 'PRD-03', name: 'Auto Safe Drive', cat: 'Auto', desc: 'Smart protection with roadside assistance.', color: 'border-rose-500', icon: Car, bg: 'bg-rose-50', text: 'text-rose-600', price: 'From $45/mo' },
  { id: 'PRD-04', name: 'Property Shield', cat: 'Property', desc: 'Secure your assets against all risks.', color: 'border-amber-500', icon: Package, bg: 'bg-amber-50', text: 'text-amber-600', price: 'From $210/mo' },
  { id: 'PRD-05', name: 'Travel Globetrotter', cat: 'Travel', desc: 'Global medical and cancellation protection.', color: 'border-violet-500', icon: Activity, bg: 'bg-violet-50', text: 'text-violet-600', price: 'From $15/day' },
  { id: 'PRD-06', name: 'Corporate Group', cat: 'Business', desc: 'Custom group plans for enterprise teams.', color: 'border-emerald-500', icon: ShoppingBag, bg: 'bg-emerald-50', text: 'text-emerald-600', price: 'Custom Quote' },
];

export function Products() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Product Catalog</h1>
          <p className="text-slate-500 font-medium italic">Available Insurance Solutions</p>
        </div>
        <button className="gradient-btn font-bold">Launch New Product</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className={`premium-card border-t-4 ${p.color} p-8 flex flex-col group relative overflow-hidden`}
          >
            <div className={`w-16 h-16 rounded-2xl ${p.bg} ${p.text} flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform duration-300`}>
              <p.icon size={32} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-800">{p.name}</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.cat}</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{p.desc}</p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Starting Price</p>
                <p className="text-lg font-bold text-slate-800">{p.price}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <Plus size={20} />
              </button>
            </div>

            {/* Subtle background effects */}
            <div className={`absolute -right-8 -top-8 w-24 h-24 ${p.bg} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
