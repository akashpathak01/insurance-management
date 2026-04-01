import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { Policies } from './pages/Policies';
import { Cases } from './pages/Cases';
import { Products } from './pages/Products';
import { NetWorth } from './pages/NetWorth';
import { Documents } from './pages/Documents';
import { Reports } from './pages/Reports';
import { Contacts } from './pages/Contacts';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { Approvals } from './pages/Approvals';
import { AccountDetail } from './pages/AccountDetail';
import { Toaster } from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="accounts/:id" element={<AccountDetail />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="policies" element={<Policies />} />
          <Route path="products" element={<Products />} />
          <Route path="networth" element={<NetWorth />} />
          <Route path="cases" element={<Cases />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="documents" element={<Documents />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
