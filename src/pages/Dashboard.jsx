import React, { useMemo } from 'react';
import { useAuthStore, roles } from '../store/useAuthStore';
import { useAccountStore } from '../store/useAccountStore';
import { useContactStore } from '../store/useContactStore';
import { usePolicyStore } from '../store/usePolicyStore';
import { useCaseStore } from '../store/useCaseStore';
import { useUserStore } from '../store/useUserStore';
import { useProductStore } from '../store/useProductStore';
import { 
  Users, 
  DollarSign, 
  Shield, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Package,
  AlertTriangle,
  Briefcase,
  FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f43f5e', '#fbbf24', '#10b981'];

const StatCard = ({ stat }) => (
  <div className="premium-card p-6 flex items-center gap-6 group hover:shadow-xl transition-all">
    <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
      <stat.icon size={28} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
        {stat.change && <span className="text-xs font-bold text-emerald-500">{stat.change}</span>}
      </div>
    </div>
  </div>
);

export function Dashboard() {
  const { user } = useAuthStore();
  const { accounts } = useAccountStore();
  const { contacts } = useContactStore();
  const { policies } = usePolicyStore();
  const { cases } = useCaseStore();
  const { users } = useUserStore();
  const { products } = useProductStore();

  const adminStats = useMemo(() => [
    { label: 'Total Users', value: users.length, icon: Users, change: '+5%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Accounts', value: accounts.length, icon: Briefcase, change: '+12%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Policies', value: policies.filter(p => p.status === 'Active').length, icon: Shield, change: '+2.1%', color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Pending Claims', value: cases.filter(c => c.status !== 'Closed').length, icon: Activity, change: '+0.4%', color: 'text-rose-600', bg: 'bg-rose-50' },
  ], [users, accounts, policies, cases]);

  const policyDistribution = useMemo(() => {
    const counts = policies.reduce((acc, p) => {
      acc[p.product] = (acc[p.product] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [policies]);

  const revenueData = [
    { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
  ];

  const renderAdmin = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, i) => <StatCard key={i} stat={stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Policy Distribution</h3>
          <div className="h-80">
            {policyDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={policyDistribution} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                    {policyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">
                <Shield size={48} className="mb-2 opacity-20" />
                No policies to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderManager = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Operational Overview</h2>
          <p className="text-slate-500 font-medium">Monitoring business throughput and team capacity</p>
        </div>
        <button className="gradient-btn font-bold">Export Operational Report</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Active Staff Performance</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Staff Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.slice(0, 5).map((u, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-700">{u.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase tracking-wider">{u.role}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">Assign Task</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-primary">Claim Progress Queue</h3>
          <div className="space-y-4">
            {cases.slice(0, 4).map((c, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{c.title}</span>
                  <Activity size={16} className="text-primary" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority: {c.priority}</span>
                  <button className="text-xs text-primary font-bold group-hover:underline">Track</button>
                </div>
              </div>
            ))}
            {cases.length === 0 && <p className="text-sm text-slate-400 italic text-center py-10">No active claims</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard stat={{ label: 'Assigned Accounts', value: accounts.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' }} />
        <StatCard stat={{ label: 'Pending Claims', value: cases.filter(c => c.step < 3).length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }} />
        <StatCard stat={{ label: 'My Policies', value: policies.length, icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50' }} />
        <StatCard stat={{ label: 'Active Reports', value: '2', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Accounts</h3>
            <span className="text-xs text-slate-400">Total Managed: {accounts.length}</span>
          </div>
          <div className="space-y-4">
            {accounts.slice(0, 4).map((acc, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary font-bold border border-slate-100 shadow-sm">{acc.name[0]}</div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-slate-700">{acc.name}</h5>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{acc.type}</span>
                </div>
                <button className="p-2 text-slate-300 hover:text-primary transition-colors"><ChevronRight size={18} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-primary flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 rounded-3xl border-2 border-dashed border-slate-100 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3">
              <Package size={32} className="text-slate-300" />
              <span className="text-sm font-bold text-slate-600">Product List</span>
            </button>
            <button className="p-6 rounded-3xl border-2 border-dashed border-slate-100 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3">
              <FileText size={32} className="text-slate-300" />
              <span className="text-sm font-bold text-slate-600">All Documents</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const getDashboardContent = () => {
    switch (user?.role) {
      case roles.ADMIN: return renderAdmin();
      case roles.MANAGER: return renderManager();
      case roles.STAFF: return renderStaff();
      case roles.UNDERWRITER: return renderAdmin(); // Underwriter uses admin view for now
      default: return null;
    }
  };

  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name}</h1>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">{user?.role}</span>
          </div>
          <p className="text-slate-500 font-medium">Enterprise Admin Panel Overview</p>
        </div>
        <div className="hidden md:flex items-center gap-4 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex h-10 px-4 items-center bg-slate-50 rounded-xl text-slate-400 text-sm font-medium">
            <Clock size={16} className="mr-2" />
            Active Session
          </div>
        </div>
      </div>

      {getDashboardContent()}
    </div>
  );
}
