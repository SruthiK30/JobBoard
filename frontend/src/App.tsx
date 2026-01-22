import React, { useEffect, useState } from 'react';
import { RoleSelector } from './components/RoleSelector';
import { JobList } from './pages/JobListPage';
import { authService } from './services/api';

export function App() {
  const [role, setRole] = useState<'user' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always start at role selector - don't auto-load saved role
    setLoading(false);
  }, []);

  const handleSelectRole = async (selectedRole: 'user' | 'admin') => {
    try {
      await authService.setRole(selectedRole);
      setRole(selectedRole);
    } catch (error) {
      console.error('Failed to set role:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.setRole('user'); // Reset to user role
      setRole(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return role ? (
    <JobList role={role} onLogout={handleLogout} />
  ) : (
    <RoleSelector onSelectRole={handleSelectRole} />
  );
}
