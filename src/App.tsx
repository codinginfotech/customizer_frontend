import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { MainLayout } from './layouts/MainLayout';
import { PageSpinner } from './components/ui';
import { ProtectedRoute, AdminRoute } from './features/auth/guards';
import LandingPage from './features/home/LandingPage';
import ProductsPage from './features/products/ProductsPage';
import ProductDetailPage from './features/products/ProductDetailPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import ForgotPasswordPage from './features/auth/ForgotPasswordPage';
import ResetPasswordPage from './features/auth/ResetPasswordPage';

// Heavy routes are lazy-loaded (Konva + Three only ship when needed).
const DesignerPage = lazy(() => import('./features/designer/DesignerPage'));
const DashboardRoutes = lazy(() => import('./features/dashboard/DashboardRoutes'));
const CartPage = lazy(() => import('./features/cart/CartPage'));
const CheckoutPage = lazy(() => import('./features/cart/CheckoutPage'));
const AdminRoutes = lazy(() => import('./features/admin/AdminRoutes'));

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardRoutes />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Full-screen editor without the marketing chrome */}
        <Route path="/designer/:productSlug" element={<DesignerPage />} />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminRoutes />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
