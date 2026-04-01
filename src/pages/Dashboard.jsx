import { useAuthStore, roles } from '../store/useAuthStore';
import { 
  Users, 
  DollarSign, 
  Shield, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Package,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const stats = {
  global: [
    { label: 'Total Users', value: '1,284', icon: Users, change: '+12%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Revenue', value: '$4.2M', icon: DollarSign, change: '+8.4%', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Active Policies', value: '8,432', icon: Shield, change: '+2.1%', color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Claims Sync', value: '98.4%', icon: Activity, change: '+0.4%', color: 'text-rose-600', bg: 'bg-rose-50' },
  ],
  revenue: [
    { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
  ],
  distribution: [
    { name: 'Life', value: 400 }, { name: 'Health', value: 300 },
    { name: 'Auto', value: 300 }, { name: 'Property', value: 200 },
  ]
};

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f43f5e'];

const StatCard = ({ stat }) => (
  <div className="premium-card p-6 flex items-center gap-6">
    <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
      <stat.icon size={28} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
        <span className="text-xs font-bold text-emerald-500">{stat.change}</span>
      </div>
    </div>
  </div>
);

export function Dashboard() {
  const { user } = useAuthStore();

  const renderAdmin = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.global.map((stat, i) => <StatCard key={i} stat={stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenue}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Policy Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.distribution} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {stats.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManager = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Team Performance</h2>
          <p className="text-slate-500">Region: North America Operations</p>
        </div>
        <button className="gradient-btn">Export Report</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Policies</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'John Doe', policies: 12, value: '$140k', status: 'On Track' },
                { name: 'Jane Smith', policies: 8, value: '$92k', status: 'Rising' },
                { name: 'Mike Ross', policies: 15, value: '$210k', status: 'Excelled' },
              ].map((agent, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{agent.name}</td>
                  <td className="px-6 py-4 text-slate-600">{agent.policies}</td>
                  <td className="px-6 py-4 text-slate-600">{agent.value}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">{agent.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-primary">Approval Queue</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-slate-700">Policy Renewal #482{i}</span>
                  <Clock size={16} className="text-slate-400" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Requested by Agent {i}</span>
                  <button className="text-xs text-primary font-bold group-hover:underline">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard stat={{ label: 'My Accounts', value: '42', icon: Users, change: '+2', color: 'text-primary', bg: 'bg-primary/10' }} />
        <StatCard stat={{ label: 'Pending Claims', value: '5', icon: Clock, change: '-1', color: 'text-amber-600', bg: 'bg-amber-50' }} />
        <StatCard stat={{ label: 'Renewals Due', value: '12', icon: Activity, change: '0', color: 'text-cyan-600', bg: 'bg-cyan-50' }} />
        <StatCard stat={{ label: 'Closed Deals', value: '8', icon: CheckCircle2, change: '+3', color: 'text-emerald-600', bg: 'bg-emerald-50' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">My Priority Tasks</h3>
            <span className="text-xs text-slate-400">Total: 4</span>
          </div>
          <div className="space-y-4">
            {[
              { t: 'Follow up with David Miller', d: 'Due Today', p: 'High' },
              { t: 'Review Claim #9421', d: 'Due Tomorrow', p: 'Medium' },
              { t: 'Upload medical docs for Case 42', d: 'Due in 2 days', p: 'Low' },
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all">
                <div className={`w-3 h-3 rounded-full ${task.p === 'High' ? 'bg-rose-500' : task.p === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-slate-700">{task.t}</h5>
                  <span className="text-xs text-slate-500">{task.d}</span>
                </div>
                <button className="p-2 text-slate-300 hover:text-primary transition-colors"><CheckCircle2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3">
              <Package className="text-slate-400" />
              <span className="text-sm font-bold text-slate-600">New Quote</span>
            </button>
            <button className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3">
              <Activity className="text-slate-400" />
              <span className="text-sm font-bold text-slate-600">Submit Claim</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUnderwriter = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Review Dashboard</h2>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 px-4 py-2 bg-slate-100 rounded-lg">
            <AlertTriangle size={14} className="text-rose-500" /> 
            3 Critical Reviews
          </span>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Case ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Policy Holder</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Submission Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 'C-9021', name: 'Robert Chen', risk: 'High', date: '2023-11-20' },
              { id: 'C-9022', name: 'Linda Wilson', risk: 'Low', date: '2023-11-21' },
              { id: 'C-9023', name: 'Marcus Aurelius', risk: 'Medium', date: '2023-11-21' },
            ].map((caseItem, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-primary">{caseItem.id}</td>
                <td className="px-6 py-4 font-medium text-slate-700">{caseItem.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${caseItem.risk === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {caseItem.risk}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{caseItem.date}</td>
                <td className="px-6 py-4">
                  <button className="text-sm font-bold text-slate-800 hover:text-primary transition-colors">Review Case</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const getDashboardContent = () => {
    switch (user?.role) {
      case roles.SUPER_ADMIN: return renderAdmin();
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
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user?.name}</h1>
          <p className="text-slate-500 font-medium">Here's your CRM {user?.role.toLowerCase()} overview.</p>
        </div>
        <div className="flex items-center gap-4 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex h-10 px-4 items-center bg-slate-50 rounded-xl text-slate-400 text-sm font-medium">
            <Clock size={16} className="mr-2" />
            Last Login: Oct 28, 11:42 AM
          </div>
        </div>
      </div>

      {getDashboardContent()}
    </div>
  );
}
