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
