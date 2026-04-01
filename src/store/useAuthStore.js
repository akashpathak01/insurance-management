import { create } from 'zustand';

const roles = {
  SUPER_ADMIN: 'Admin',
  MANAGER: 'Manager',
  STAFF: 'Staff',
  UNDERWRITER: 'Underwriter',
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export { useAuthStore, roles };
