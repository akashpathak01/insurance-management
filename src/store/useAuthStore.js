import { create } from 'zustand';

const roles = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  STAFF: 'Staff',
  UNDERWRITER: 'Underwriter',
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => {
    // Normalize legacy roles
    const normalizedUser = { ...userData };
    if (normalizedUser.role === 'Super Admin') normalizedUser.role = roles.ADMIN;
    set({ user: normalizedUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export { useAuthStore, roles };
