import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { PageSpinner } from '../../components/ui';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, initializing } = useAuthStore();
  const location = useLocation();
  if (initializing) return <PageSpinner />;
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, initializing } = useAuthStore();
  if (initializing) return <PageSpinner />;
  if (!user) return <Navigate to="/login" state={{ from: '/admin' }} replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />;
  return <>{children}</>;
}
