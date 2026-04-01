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
  FileText,
  Calendar,
  TrendingDown,
  XCircle,
  Building2,
  PieChart as PieIcon,
  Plus,
  ChevronRight,
  BarChart3,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Badge } from '../components/ui';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f43f5e', '#fbbf24', '#10b981'];

const StatCard = ({ stat, onClick }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    onClick={onClick}
    className="premium-card p-6 flex items-center gap-6 group hover:shadow-xl transition-all cursor-pointer border-b-2 border-transparent hover:border-primary/20"
  >
    <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
      <stat.icon size={28} />
    </div>
    <div className="flex-1">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
        {stat.change && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
            stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {stat.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {stat.change}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const QuickActionBtn = ({ icon: Icon, label, onClick, color }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-100 rounded-3xl hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all group active:scale-95"
  >
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6`}>
      <Icon size={24} />
    </div>
    <span className="text-xs font-bold text-slate-600 group-hover:text-primary">{label}</span>
  </button>
);

export function Dashboard() {
  const { user } = useAuthStore();
  const { accounts, addAccount } = useAccountStore();
  const { contacts } = useContactStore();
  const { policies, addPolicy, updatePolicy } = usePolicyStore();
  const { cases, addCase, updateCase } = useCaseStore();
  const { users, addUser } = useUserStore();
  const { products } = useProductStore();
  const navigate = useNavigate();

  const [chartPeriod, setChartPeriod] = React.useState('7D');
  const [activeModal, setActiveModal] = React.useState(null);

  const adminStats = useMemo(() => [
    { label: 'Total Users', value: users.length, icon: Users, change: '+5%', trend: 'up', color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/users' },
    { label: 'Total Accounts', value: accounts.length, icon: Briefcase, change: '+12%', trend: 'up', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/accounts' },
    { label: 'Active Policies', value: policies.filter(p => p.status === 'Active').length, icon: Shield, change: '+2.1%', trend: 'up', color: 'text-violet-600', bg: 'bg-violet-50', path: '/policies' },
    { label: 'Pending Claims', value: cases.filter(c => c.status !== 'Closed').length, icon: Activity, change: '+0.4%', trend: 'down', color: 'text-rose-600', bg: 'bg-rose-50', path: '/cases' },
  ], [users, accounts, policies, cases]);

  const pendingApprovals = useMemo(() => {
    const pendingCases = cases.filter(c => c.status === 'In Review' || c.step === 1).map(c => ({ ...c, type: 'Claim' }));
    const pendingPolicies = policies.filter(p => p.status === 'Pending').map(p => ({ ...p, type: 'Policy', title: `${p.product} - ${p.accountName}` }));
    return [...pendingCases, ...pendingPolicies].sort((a,b) => b.id.localeCompare(a.id)).slice(0, 5);
  }, [cases, policies]);

  const alerts = useMemo(() => {
    const expiringSoon = policies.filter(p => p.status === 'Expiring').map(p => ({ label: 'Expiring Soon', msg: `${p.product} for ${p.accountName}`, type: 'warning' }));
    const highPriorityClaims = cases.filter(c => c.priority === 'High' && c.status !== 'Closed').map(c => ({ label: 'High Priority', msg: c.title, type: 'error' }));
    return [...expiringSoon, ...highPriorityClaims].slice(0, 4);
  }, [policies, cases]);

  const policyDistribution = useMemo(() => {
    const counts = policies.reduce((acc, p) => {
      acc[p.product] = (acc[p.product] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [policies]);

  const managerStats = useMemo(() => [
    { label: 'Total Policies', value: policies.length, icon: Shield, change: '+8%', trend: 'up', color: 'text-primary', bg: 'bg-primary/10', path: '/policies' },
    { label: 'Pending Approvals', value: pendingApprovals.length, icon: CheckCircle2, change: '-2', trend: 'down', color: 'text-amber-600', bg: 'bg-amber-50', path: '/approvals' },
    { label: 'Active Claims', value: cases.filter(c => c.status !== 'Closed').length, icon: Activity, change: '+12%', trend: 'up', color: 'text-rose-600', bg: 'bg-rose-50', path: '/cases' },
    { label: 'Team Performance', value: '94.2%', icon: TrendingUp, change: '+2.1%', trend: 'up', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/users' },
  ], [policies, pendingApprovals, cases]);

  const staffStats = useMemo(() => [
    { label: 'Assigned Accounts', value: accounts.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pending Claims', value: cases.filter(c => c.status === 'New' || c.status === 'In Review').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'My Policies', value: policies.length, icon: Shield, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Active Reports', value: '2', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ], [accounts, cases, policies]);

  const underwriterStats = useMemo(() => [
    { label: 'Policies to Review', value: policies.filter(p => p.status === 'Pending').length, icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Claims', value: cases.filter(c => c.status === 'In Review' || c.status === 'New').length, icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Approved Today', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected Today', value: '4', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
  ], [policies, cases]);

  const revenueData = [
    { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
  ];

  const handleApprove = (item) => {
    if (item.type === 'Claim') {
      updateCase(item.id, { status: 'Approved', step: 3 });
      toast.success(`Claim ${item.id} Approved`);
    } else {
      updatePolicy(item.id, { status: 'Active' });
      toast.success(`Policy ${item.id} Activated`);
    }
  };

  const handleReject = (item) => {
    if (item.type === 'Claim') {
      updateCase(item.id, { status: 'Rejected', step: 4 });
      toast.error(`Claim ${item.id} Rejected`);
    } else {
      updatePolicy(item.id, { status: 'Declined' });
      toast.error(`Policy ${item.id} Declined`);
    }
  };

  const renderAdmin = () => (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, i) => (
          <StatCard key={i} stat={stat} onClick={() => navigate(stat.path)} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="premium-card p-6 h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Package size={20} className="text-primary" />
              Quick Command Hub
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionBtn icon={Briefcase} label="Add Account" color="bg-emerald-50 text-emerald-600" onClick={() => setActiveModal('account')} />
              <QuickActionBtn icon={Shield} label="Issue Policy" color="bg-violet-50 text-violet-600" onClick={() => setActiveModal('policy')} />
              <QuickActionBtn icon={Activity} label="Open Case" color="bg-rose-50 text-rose-600" onClick={() => setActiveModal('claim')} />
              <QuickActionBtn icon={Users} label="Invite User" color="bg-indigo-50 text-indigo-600" onClick={() => setActiveModal('user')} />
            </div>
          </div>
        </div>

        {/* Charts Main */}
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <TrendingUp size={20} className="text-primary" />
               Revenue Growth
             </h3>
             <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
               {['7D', '30D', '1Y'].map(p => (
                 <button 
                  key={p} 
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                    chartPeriod === p ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'
                  }`}
                 >
                   {p}
                 </button>
               ))}
             </div>
          </div>
          <div className="h-64">
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
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              Approval Queue
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">Priority Required</span>
          </div>
          <div className="divide-y divide-slate-50">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                    item.type === 'Claim' ? 'bg-rose-500' : 'bg-primary'
                  }`}>
                    {item.type === 'Claim' ? <Activity size={20} /> : <Shield size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      {item.title}
                      <span className="text-[10px] text-slate-400 font-mono">{item.id}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{item.customer || item.accountName} • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <button onClick={() => handleReject(item)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                  <button onClick={() => handleApprove(item)} className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all">Approve</button>
                </div>
              </div>
            ))}
            {pendingApprovals.length === 0 && (
              <div className="p-12 text-center text-slate-400 italic">Queue is clear! Well done.</div>
            )}
          </div>
        </div>

        {/* System Alerts */}
        <div className="premium-card p-6">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-500" />
              System Alerts
            </h3>
            <div className="space-y-4">
              {alerts.map((alert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-2xl border flex gap-3 ${
                    alert.type === 'warning' ? 'bg-amber-50/50 border-amber-100' : 'bg-rose-50/50 border-rose-100'
                  }`}
                >
                  <div className={`mt-1 ${alert.type === 'warning' ? 'text-amber-500' : 'text-rose-500'}`}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${alert.type === 'warning' ? 'text-amber-600' : 'text-rose-600'}`}>{alert.label}</p>
                    <p className="text-xs font-bold text-slate-700 mt-1">{alert.msg}</p>
                  </div>
                </motion.div>
              ))}
              {alerts.length === 0 && <p className="text-sm text-slate-400 italic text-center py-10">All systems optimal</p>}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              Recent System Activity
            </h3>
          </div>
          <div className="space-y-6 relative ml-4">
             {/* Timeline Line */}
             <div className="absolute left-[-1.5px] top-2 bottom-4 w-[3px] bg-slate-50 rounded-full"></div>
             
             {[
               { t: 'Account Created', d: 'Global Tech Solutions was onboarded', time: '12 mins ago', icon: Building2, c: 'bg-emerald-500' },
               { t: 'Policy Issued', d: 'Cyber Liability policy approved for Apex Logistics', time: '45 mins ago', icon: Shield, c: 'bg-primary' },
               { t: 'Claim Updated', d: 'Claim CLM-412 moved to Settlement stage', time: '2 hours ago', icon: Activity, c: 'bg-rose-500' },
               { t: 'New User Invited', d: 'Territory Manager invite sent to Mark R.', time: '5 hours ago', icon: Users, c: 'bg-indigo-500' },
             ].map((act, i) => (
               <div key={i} className="flex gap-6 relative">
                 <div className={`w-4 h-4 rounded-full ${act.c} z-10 mt-1 border-4 border-white shadow-sm ring-1 ring-slate-100`}></div>
                 <div className="flex-1 pb-6 border-b border-slate-50 last:border-0">
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="text-sm font-bold text-slate-800">{act.t}</h4>
                     <span className="text-[10px] text-slate-400 font-bold uppercase">{act.time}</span>
                   </div>
                   <p className="text-xs text-slate-500 font-medium">{act.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="premium-card p-6">
           <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
              <PieIcon size={20} className="text-primary" />
              Policy distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={policyDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                    {policyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {policyDistribution.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                  <span className="text-[10px] font-bold text-slate-500 truncate">{item.name}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ progress, color = 'bg-primary' }) => (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color}`}
      />
    </div>
  );

  const renderManager = () => (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {managerStats.map((stat, i) => (
          <StatCard key={i} stat={stat} onClick={() => navigate(stat.path)} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="premium-card p-6 h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 font-primary">
              <Package size={20} className="text-primary" />
              Manager Operations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionBtn icon={CheckCircle2} label="Approve Claims" color="bg-emerald-50 text-emerald-600" onClick={() => navigate('/approvals')} />
              <QuickActionBtn icon={Briefcase} label="View Policies" color="bg-violet-50 text-violet-600" onClick={() => navigate('/policies')} />
              <QuickActionBtn icon={Users} label="Assign Tasks" color="bg-rose-50 text-rose-600" onClick={() => toast('Direct Task Assignment Coming Soon!')} />
              <QuickActionBtn icon={BarChart3} label="Generate Reports" color="bg-indigo-50 text-indigo-600" onClick={() => navigate('/reports')} />
            </div>
          </div>
        </div>

        {/* Operational Analytics */}
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-primary">
               <TrendingUp size={20} className="text-primary" />
               Team Productivity Graph
             </h3>
             <Badge variant="primary">Last 30 Days</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Claim Priority Queue */}
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-primary">
              <Activity size={20} className="text-rose-500" />
              Claim Priority Queue
            </h3>
            <div className="flex gap-2">
              <Badge variant="danger">High Severity</Badge>
              <Badge variant="secondary">Total: {cases.length}</Badge>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {cases.slice(0, 5).map((c, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                    c.priority === 'High' ? 'bg-rose-500' : c.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      {c.description || c.title}
                      <Badge variant={c.priority === 'High' ? 'danger' : 'secondary'} className="text-[9px]">{c.priority}</Badge>
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      {c.accountName} • <span className="font-mono text-primary">{c.amount}</span> • Agent: <span className="text-slate-700 font-bold">{c.agentName}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <Button variant="ghost" size="sm" onClick={() => navigate('/cases')} className="font-bold">Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="premium-card p-6">
           <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2 font-primary">
              <Users size={20} className="text-indigo-500" />
              Team Performance
            </h3>
            <div className="space-y-6">
               {[
                 { name: 'Sarah Jenkins', role: 'Staff', perf: 95, tasks: 110, color: 'bg-emerald-500' },
                 { name: 'Michael Chen', role: 'Staff', perf: 82, tasks: 64, color: 'bg-amber-500' },
                 { name: 'Emily Davis', role: 'Underwriter', perf: 91, tasks: 88, color: 'bg-emerald-500' },
                 { name: 'Alex Wright', role: 'Staff', perf: 45, tasks: 22, color: 'bg-rose-500' },
               ].map((member, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-700">{member.name}</span>
                      <span className="font-black text-primary">{member.perf}%</span>
                   </div>
                   <ProgressBar progress={member.perf} color={member.color} />
                   <div className="flex justify-between text-[10px] font-black text-slate-400 tracking-widest uppercase">
                     <span>{member.role}</span>
                     <span>{member.tasks} Tasks Finished</span>
                   </div>
                 </div>
               ))}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Operational Activity */}
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-primary">
              <Activity size={20} className="text-primary" />
              Recent Operational Activity
            </h3>
            <Button variant="ghost" size="sm" className="text-primary font-bold">View Audit Log</Button>
          </div>
          <div className="space-y-6 relative ml-4">
             <div className="absolute left-[-1.5px] top-2 bottom-4 w-[3px] bg-slate-50 rounded-full"></div>
             
             {[
               { t: 'Policy Approved', d: 'Sarah Jenkins approved Cyber Liability for Peak Financial', time: '5 mins ago', icon: Shield, c: 'bg-emerald-500' },
               { t: 'Claim Settlement', d: 'Michael Chen moved CAS-402 to Settlement phase', time: '1 hour ago', icon: DollarSign, c: 'bg-primary' },
               { t: 'Quote Rejected', d: 'Underwriter Emily Davis Declined Auto-Comp for ABC Corp', time: '3 hours ago', icon: XCircle, c: 'bg-rose-500' },
               { t: 'New Document', d: 'Client uploaded Compliance Statement for NOVA', time: '5 hours ago', icon: FileText, c: 'bg-indigo-500' },
             ].map((act, i) => (
               <div key={i} className="flex gap-6 relative">
                 <div className={`w-4 h-4 rounded-full ${act.c} z-10 mt-1 border-4 border-white shadow-sm ring-1 ring-slate-100`}></div>
                 <div className="flex-1 pb-6 border-b border-slate-50 last:border-0 hover:translate-x-1 transition-transform cursor-pointer">
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="text-sm font-bold text-slate-800">{act.t}</h4>
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{act.time}</span>
                   </div>
                   <p className="text-xs text-slate-500 font-medium">{act.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Success Rate Pie */}
        <div className="premium-card p-6">
           <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2 font-primary">
              <PieIcon size={20} className="text-primary" />
              Approval Success Rate
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={[
                      { name: 'Approved', value: 72 },
                      { name: 'Rejected', value: 18 },
                      { name: 'Pending', value: 10 }
                    ]} 
                    cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={8} dataKey="value"
                  >
                    {[
                      <Cell key="1" fill="#10b981" />,
                      <Cell key="2" fill="#f43f5e" />,
                      <Cell key="3" fill="#cbd5e1" />,
                    ]}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-6">
              {[
                { l: 'Approved', v: '72%', c: 'bg-emerald-500' },
                { l: 'Investigating', v: '18%', c: 'bg-rose-500' },
                { l: 'Backlog', v: '10%', c: 'bg-slate-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <div className={`w-2 h-2 rounded-full ${item.c}`} />
                    <span>{item.l}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );

  const renderUnderwriter = () => (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {underwriterStats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Queue */}
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-primary">
              <CheckCircle2 size={20} className="text-primary" />
              Underwriter Review Mode
            </h3>
            <Badge variant="warning">Authorization Required</Badge>
          </div>
          <div className="divide-y divide-slate-50">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition-all group gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                    item.type === 'Claim' ? 'bg-rose-500 shadow-rose-200' : 'bg-primary shadow-indigo-200'
                  }`}>
                    {item.type === 'Claim' ? <Activity size={24} /> : <Shield size={24} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                       {item.title}
                       <span className="text-[10px] text-slate-400 font-mono tracking-tighter">REF-{item.id}</span>
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      {item.customer || item.accountName} • <Badge variant="secondary" className="px-1 py-0">{item.type}</Badge>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" className="text-slate-400 hover:text-primary transition-colors">Details</Button>
                   <Button variant="ghost" size="sm" className="text-slate-400 hover:text-primary transition-colors" onClick={() => toast(`Observation logged for ${item.id}`)}>Add Note</Button>
                   <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
                   <button onClick={() => handleReject(item)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"><XCircle size={20} /></button>
                   <button onClick={() => handleApprove(item)} className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">Confirm</button>
                </div>
              </div>
            ))}
            {pendingApprovals.length === 0 && (
              <div className="p-16 text-center text-slate-400 italic font-medium">All reviews complete! The queue is empty.</div>
            )}
          </div>
        </div>

        {/* Risk Assessment Panel */}
        <div className="premium-card p-6 flex flex-col">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 font-primary">
              <ShieldCheck size={20} className="text-emerald-500" />
              Risk Analysis Hub
            </h3>
            
            <div className="space-y-6 flex-1">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin-slow flex items-center justify-center">
                     <span className="text-xl font-black text-slate-800">M</span>
                  </div>
                  <div className="text-center">
                     <h5 className="font-bold text-slate-800 italic">Moderate Exposure</h5>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Average Portfolio Risk</p>
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                    { l: 'Document Completeness', v: 88, c: 'bg-emerald-500' },
                    { l: 'Validation Score', v: 72, c: 'bg-primary' },
                    { l: 'Verification Delay', v: 14, c: 'bg-rose-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <span>{item.l}</span>
                          <span>{item.v}%</span>
                       </div>
                       <ProgressBar progress={item.v} color={item.c} />
                    </div>
                  ))}
               </div>
            </div>

            <Button variant="outline" className="w-full mt-8 font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl border-2 border-slate-100 group">
               <TrendingUp size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
               Detailed Assessment
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Alerts Panel */}
         <div className="premium-card p-6 border-t-4 border-t-rose-500">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 font-primary">
              <AlertTriangle size={20} className="text-rose-500" />
              Urgent Validations
            </h3>
            <div className="space-y-4">
               {alerts.map((alert, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                     <div className={`mt-1 ${alert.type === 'warning' ? 'text-amber-500' : 'text-rose-500'}`}>
                        <Clock size={16} />
                     </div>
                     <div>
                        <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{alert.label}</h6>
                        <p className="text-xs font-bold text-slate-800">{alert.msg}</p>
                     </div>
                  </div>
               ))}
               <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-800">3 Verification cases resolved today</span>
               </div>
            </div>
         </div>

         {/* Policy Distribution */}
         <div className="premium-card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2 font-primary">
              <PieIcon size={20} className="text-primary" />
              Risk Portfolio Breakdown
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={policyDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={8} dataKey="value">
                    {policyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {policyDistribution.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                  <span className="text-[9px] font-black text-slate-500 truncate uppercase tracking-tighter">{item.name}</span>
                </div>
              ))}
            </div>
         </div>

         {/* Recent Review Actions */}
         <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-primary">
                <Activity size={20} className="text-primary" />
                Review Activity Feed
              </h3>
            </div>
            <div className="space-y-6 relative ml-4">
               <div className="absolute left-[-1.5px] top-2 bottom-4 w-[3px] bg-slate-50 rounded-full"></div>
               {[
                 { t: 'Policy Validated', d: 'Cyber Risk Assessment for Global Tech', time: '1 hr ago', c: 'bg-emerald-500' },
                 { t: 'Claim Investigated', d: 'Damage Verification for CAS-402', time: '3 hr ago', c: 'bg-primary' },
                 { t: 'Note Added', d: 'High exposure warning for Apex Logistics', time: '5 hr ago', c: 'bg-amber-500' },
               ].map((act, i) => (
                 <div key={i} className="flex gap-4 relative">
                   <div className={`w-3 h-3 rounded-full ${act.c} z-10 mt-1 border-2 border-white ring-1 ring-slate-100`}></div>
                   <div className="flex-1 pb-4">
                     <div className="flex justify-between items-start mb-0.5">
                       <h4 className="text-sm font-bold text-slate-800">{act.t}</h4>
                       <span className="text-[9px] text-slate-400 font-bold uppercase">{act.time}</span>
                     </div>
                     <p className="text-[11px] text-slate-500 font-medium">{act.d}</p>
                   </div>
                 </div>
               ))}
               <Button variant="ghost" size="sm" className="w-full text-primary font-bold text-[10px] uppercase tracking-widest mt-2">View Audit Archive</Button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderActionModals = () => {
    return (
      <>
        {/* Simplified Modals for Quick Actions */}
        <Modal 
          isOpen={activeModal === 'account'} 
          onClose={() => setActiveModal(null)}
          title="Quick Add Account"
        >
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Name</label>
               <input id="q-acc-name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all" placeholder="Enter company name..." />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Email</label>
                 <input id="q-acc-email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all" placeholder="email@corp.com" />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
                 <select id="q-acc-type" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all font-bold text-xs uppercase tracking-tighter">
                   <option>Enterprise</option>
                   <option>Mid-Market</option>
                   <option>Small Business</option>
                 </select>
               </div>
             </div>
             <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button className="flex-1" onClick={() => {
                  const name = document.getElementById('q-acc-name').value;
                  const email = document.getElementById('q-acc-email').value;
                  const type = document.getElementById('q-acc-type').value;
                  if (!name || !email) return toast.error('Please fill required fields');
                  addAccount({ name, email, type, contact: 'Primary', status: 'Active', value: '$0' });
                  toast.success('Account Onboarded Successfully');
                  setActiveModal(null);
                }}>Confirm & Add</Button>
             </div>
          </div>
        </Modal>

        <Modal 
          isOpen={activeModal === 'policy'} 
          onClose={() => setActiveModal(null)}
          title="Direct Policy Issuance"
        >
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Account</label>
               <select id="q-pol-acc" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all">
                 {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
               </select>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</label>
                 <select id="q-pol-prod" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all">
                   {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coverage</label>
                 <input id="q-pol-cov" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all font-mono" placeholder="$1,000,000" />
               </div>
             </div>
             <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button className="flex-1" onClick={() => {
                  const accountId = document.getElementById('q-pol-acc').value;
                  const acc = accounts.find(a => a.id === accountId);
                  const product = document.getElementById('q-pol-prod').value;
                  const coverage = document.getElementById('q-pol-cov').value;
                  addPolicy({ 
                    product, 
                    accountId, 
                    accountName: acc.name, 
                    coverage, 
                    premium: '$4,200', 
                    status: 'Active', 
                    expiryDate: '2025-10-12' 
                  });
                  toast.success('Policy Issued Successfully');
                  setActiveModal(null);
                }}>Issue Now</Button>
             </div>
          </div>
        </Modal>

        {/* Claim Modal */}
        <Modal 
          isOpen={activeModal === 'claim'} 
          onClose={() => setActiveModal(null)}
          title="Instant Claim Initiation"
        >
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim Title</label>
               <input id="q-cl-title" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all" placeholder="Incident description..." />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account</label>
                 <select id="q-cl-acc" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all">
                   {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</label>
                 <select id="q-cl-prio" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all font-bold text-xs uppercase tracking-widest">
                   <option>High</option>
                   <option>Medium</option>
                   <option>Low</option>
                 </select>
               </div>
             </div>
             <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button className="flex-1" onClick={() => {
                  const title = document.getElementById('q-cl-title').value;
                  const accountId = document.getElementById('q-cl-acc').value;
                  const acc = accounts.find(a => a.id === accountId);
                  const priority = document.getElementById('q-cl-prio').value;
                  if (!title) return toast.error('Please enter a claim title');
                  addCase({ title, customer: acc.name, accountId, priority, status: 'In Review', step: 1 });
                  toast.success('Claim Initiated');
                  setActiveModal(null);
                }}>Open Case</Button>
             </div>
          </div>
        </Modal>

        {/* User Modal */}
        <Modal 
          isOpen={activeModal === 'user'} 
          onClose={() => setActiveModal(null)}
          title="Invite System Member"
        >
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Name</label>
               <input id="q-usr-name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all" placeholder="Enter full name..." />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</label>
                 <select id="q-usr-role" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all font-bold text-xs uppercase tracking-tighter">
                   {Object.values(roles).map(r => <option key={r} value={r}>{r}</option>)}
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                 <input id="q-usr-email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all" placeholder="name@securecrm.io" />
               </div>
             </div>
             <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button className="flex-1" onClick={() => {
                  const name = document.getElementById('q-usr-name').value;
                  const role = document.getElementById('q-usr-role').value;
                  const email = document.getElementById('q-usr-email').value;
                  if (!name || !email) return toast.error('Please fill required fields');
                  addUser({ name, role, email, status: 'Active', login: 'Just now', permissions: 'Full' });
                  toast.success('Invitation Sent Successfully');
                  setActiveModal(null);
                }}>Send Invite</Button>
             </div>
          </div>
        </Modal>
      </>
    );
  };

  const getDashboardContent = () => {
    switch (user?.role) {
      case roles.ADMIN: return renderAdmin();
      case roles.MANAGER: return renderManager();
      case roles.STAFF: return renderStaff();
      case roles.UNDERWRITER: return renderUnderwriter(); 
      default: return null;
    }
  };

  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user?.name}</h1>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">{user?.role}</span>
          </div>
          <p className="text-slate-500 font-medium">Enterprise Admin Panel Overview • October 2023</p>
        </div>
        <div className="hidden md:flex items-center gap-4 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex h-10 px-4 items-center bg-slate-50 rounded-xl text-slate-400 text-sm font-medium">
             <Calendar size={16} className="mr-2" />
             {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {getDashboardContent()}
      {renderActionModals()}
    </div>
  );
}
