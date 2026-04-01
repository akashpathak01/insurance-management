import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialCases = [
  { id: 'CAS-402', policyId: 'POL-9042', accountName: 'Global Tech Solutions', description: 'Data breach investigation', type: 'Claim', date: '2023-10-12', status: 'In Review', priority: 'High', amount: '$45,000', agentName: 'Sarah Jenkins', timeline: [
    { date: '2023-10-12', event: 'Case Created', user: 'System' },
    { date: '2023-10-14', event: 'Documents Uploaded', user: 'Sarah Jenkins' },
  ]},
  { id: 'CAS-403', policyId: 'POL-9043', accountName: 'Apex Logistics', description: 'Minor fender bender', type: 'Accident', date: '2023-11-05', status: 'New', priority: 'Medium', amount: '$12,200', agentName: 'Michael Chen', timeline: [
    { date: '2023-11-05', event: 'Claim Submitted', user: 'James Wilson' },
  ]},
  { id: 'CAS-404', policyId: 'POL-9044', accountName: 'Nova Healthcare', description: 'Compliance audit', type: 'Legal', date: '2023-11-20', status: 'Approved', priority: 'Low', amount: '$5,500', agentName: 'Emily Davis', timeline: [
    { date: '2023-11-20', event: 'Audit Scheduled', user: 'Emily Chen' },
    { date: '2023-11-25', event: 'Approved', user: 'Admin' },
  ]},
  { id: 'CAS-405', policyId: 'POL-9045', accountName: 'Peak Financial', description: 'Property damage', type: 'Claim', date: '2023-12-01', status: 'In Review', priority: 'High', amount: '$85,000', agentName: 'Sarah Jenkins', timeline: [
    { date: '2023-12-01', event: 'Report filed', user: 'Sarah Jenkins' },
  ]},
];

export const useCaseStore = create(
  persist(
    (set) => ({
      cases: initialCases,
      addCase: (caseItem) => set((state) => ({ 
        cases: [{ ...caseItem, id: `CAS-${Math.floor(400 + Math.random() * 100)}`, timeline: [{ date: new Date().toISOString().split('T')[0], event: 'Case Created', user: 'Admin' }] }, ...state.cases] 
      })),
      updateCase: (id, updatedCase) => set((state) => ({
        cases: state.cases.map((c) => c.id === id ? { ...c, ...updatedCase } : c)
      })),
      addTimelineEvent: (id, event) => set((state) => ({
        cases: state.cases.map((c) => c.id === id ? { ...c, timeline: [...c.timeline, { ...event, date: new Date().toISOString().split('T')[0] }] } : c)
      })),
      deleteCase: (id) => set((state) => ({
        cases: state.cases.filter((c) => c.id !== id)
      })),
    }),
    {
      name: 'case-storage',
    }
  )
);
