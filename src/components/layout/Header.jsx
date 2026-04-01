import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, MessageSquare, HelpCircle, X, Shield, Briefcase, FileSearch, UserCircle } from 'lucide-react';
import { useAccountStore } from '../../store/useAccountStore';
import { usePolicyStore } from '../../store/usePolicyStore';
import { useCaseStore } from '../../store/useCaseStore';
import { useContactStore } from '../../store/useContactStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
  const { user } = useAuthStore();
  const { accounts } = useAccountStore();
  const { policies } = usePolicyStore();
  const { cases } = useCaseStore();
  const { contacts } = useContactStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filteredResults = [];

    // Search Accounts
    accounts.forEach(a => {
      if (a.name.toLowerCase().includes(term) || a.email.toLowerCase().includes(term)) {
        filteredResults.push({ id: a.id, title: a.name, type: 'Account', icon: Briefcase });
      }
    });

    // Search Policies
    policies.forEach(p => {
      if (p.id.toLowerCase().includes(term) || p.product.toLowerCase().includes(term)) {
        filteredResults.push({ id: p.id, title: p.id, subtitle: p.product, type: 'Policy', icon: Shield });
      }
    });

    // Search Cases
    cases.forEach(c => {
      if (c.id.toLowerCase().includes(term) || c.title.toLowerCase().includes(term)) {
        filteredResults.push({ id: c.id, title: c.id, subtitle: c.title, type: 'Case', icon: FileSearch });
      }
    });

    // Search Contacts
    contacts.forEach(c => {
      if (c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)) {
        filteredResults.push({ id: c.id, title: c.name, subtitle: c.role, type: 'Contact', icon: UserCircle });
      }
    });

    setResults(filteredResults.slice(0, 10)); // Limit to 10 results
  }, [searchTerm, accounts, policies, cases, contacts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex-1 max-w-xl relative" ref={searchRef}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search accounts, policies, claims..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Global Search Results Dropdown */}
        <AnimatePresence>
          {isSearchFocused && searchTerm.trim() && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden z-50 max-h-[480px] overflow-y-auto"
            >
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, i) => (
                    <Link 
                      key={`${result.type}-${result.id}`}
                      to={`/${result.type.toLowerCase()}s`} // Fallback routing
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <result.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{result.type}</span>
                          <span className="font-bold text-slate-800 truncate">{result.title}</span>
                        </div>
                        {result.subtitle && (
                          <div className="text-xs text-slate-500 font-medium truncate mt-0.5">{result.subtitle}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center flex flex-col items-center justify-center gap-2">
                   <Search size={32} className="text-slate-200" />
                   <p className="text-slate-400 font-medium italic">No results found for "{searchTerm}"</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors relative group">
          <Bell size={20} className="group-hover:text-primary transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors group">
          <MessageSquare size={20} className="group-hover:text-primary transition-colors" />
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors group">
          <HelpCircle size={20} className="group-hover:text-primary transition-colors" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-100 rounded-full transition-colors group">
          <div className="text-right hidden md:block mr-1">
             <div className="text-xs font-bold text-slate-800">{user?.name}</div>
             <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{user?.role}</div>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm shadow-primary/20">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
