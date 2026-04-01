import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialUsers = [
  { id: 'USR-001', name: 'Alexander Wright', role: 'Admin', email: 'alex@securecrm.io', status: 'Active', login: '2 mins ago', permissions: 'Full', performance: 98, tasksCompleted: 142 },
  { id: 'USR-002', name: 'Sarah Jenkins', role: 'Manager', email: 's.jenkins@securecrm.io', status: 'Active', login: '1 hour ago', permissions: 'Team', performance: 95, tasksCompleted: 110 },
  { id: 'USR-003', name: 'Michael Chen', role: 'Staff', email: 'mchen@securecrm.io', status: 'Active', login: '2 days ago', permissions: 'Data', performance: 82, tasksCompleted: 64 },
  { id: 'USR-004', name: 'Emily Davis', role: 'Underwriter', email: 'edavis@securecrm.io', status: 'Active', login: '45 mins ago', permissions: 'Review', performance: 91, tasksCompleted: 88 },
];

export const useUserStore = create(
  persist(
    (set) => ({
      users: initialUsers,
      addUser: (user) => set((state) => ({ 
        users: [{ ...user, id: `USR-${Math.floor(100 + Math.random() * 900)}`, status: 'Active', login: 'Just now' }, ...state.users] 
      })),
      updateUser: (id, updatedUser) => set((state) => ({
        users: state.users.map((u) => u.id === id ? { ...u, ...updatedUser } : u)
      })),
      toggleStatus: (id) => set((state) => ({
        users: state.users.map((u) => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      })),
    }),
    {
      name: 'user-storage',
    }
  )
);
