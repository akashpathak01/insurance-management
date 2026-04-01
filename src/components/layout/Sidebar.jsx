import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  ShieldCheck, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight,
  CheckCircle,
  Package
} from 'lucide-react';
import { useAuthStore, roles } from '../../store/useAuthStore';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', roles: Object.values(roles) },
  { id: 'accounts', label: 'Accounts', icon: ShieldCheck, path: '/accounts', roles: Object.values(roles) },
  { id: 'contacts', label: 'Contacts', icon: Users, path: '/contacts', roles: Object.values(roles) },
  { id: 'policies', label: 'Policies', icon: Briefcase, path: '/policies', roles: Object.values(roles) },
  { id: 'products', label: 'Products', icon: Package, path: '/products', roles: [roles.ADMIN, roles.MANAGER, roles.STAFF] },
  { id: 'networth', label: 'Net Worth', icon: TrendingUp, path: '/networth', roles: [roles.ADMIN, roles.MANAGER, roles.STAFF] },
  { id: 'cases', label: 'Case Open', icon: AlertCircle, path: '/cases', roles: Object.values(roles) },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle, path: '/approvals', roles: [roles.ADMIN, roles.MANAGER] },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/documents', roles: Object.values(roles) },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports', roles: [roles.ADMIN, roles.MANAGER, roles.UNDERWRITER] },
  { id: 'team', label: 'Team Overview', icon: Users, path: '/users', roles: [roles.MANAGER] },
  { id: 'users', label: 'User Management', icon: UserCircle, path: '/users', roles: [roles.ADMIN] },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', roles: [roles.ADMIN] },
];

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            SC
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">SecureCRM</span>
        </div>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={twMerge(
                    "sidebar-link",
                    isActive && "sidebar-link-active"
                  )}
                >
                  <Icon size={20} className={isActive ? "text-primary" : "text-slate-400"} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 truncate max-w-[140px]">{user?.name}</span>
              <span className="text-xs text-slate-500">{user?.role}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600 mb-2"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
