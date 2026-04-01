import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export * from './Modal';

export function Button({ className, variant = 'primary', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md px-6 py-2.5 rounded-xl',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md px-6 py-2.5 rounded-xl',
    outline: 'border-2 border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-xl',
    ghost: 'text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg',
    gradient: 'gradient-btn',
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)} 
      {...props} 
    />
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div className={twMerge('premium-card p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'primary', className }) {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-rose-50 text-rose-600',
  };

  return (
    <span className={twMerge(
      'px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
