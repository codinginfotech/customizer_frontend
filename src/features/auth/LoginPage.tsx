import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import { apiErrorMessage } from '../../services/apiClient';
import { Field, Spinner } from '../../components/ui';
import { AuthFooterLink, AuthShell } from './AuthShell';
import { AuthDivider, GoogleSignInButton } from './GoogleSignInButton';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@customizer.dev', password: 'Admin123!' },
  { label: 'Customer', email: 'demo@customizer.dev', password: 'Demo1234' },
];

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  async function submit(nextEmail: string, nextPassword: string) {
    setBusy(true);
    try {
      await login(nextEmail, nextPassword);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from || '/dashboard', { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Sign in failed'));
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void submit(email, password);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up your saved designs and orders."
      footer={<AuthFooterLink prompt="New to Makely?" to="/register" label="Create an account" />}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <Field label="Email">
          <input
            type="email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </Field>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label className="label mb-0" htmlFor="password">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={reveal ? 'text' : 'password'}
              required
              className="input pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setReveal((v) => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-700"
              aria-label={reveal ? 'Hide password' : 'Show password'}
            >
              {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary btn-lg w-full" disabled={busy || googleBusy}>
          {busy && <Spinner className="h-4 w-4 text-white" />}
          Sign in
        </button>
      </form>

      <div className="mt-6 space-y-5">
        <AuthDivider />
        <GoogleSignInButton disabled={busy} onBusyChange={setGoogleBusy} />
      </div>

      {/* <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50/60 p-3.5">
        <p className="panel-title">Demo accounts</p>
        <div className="mt-2.5 space-y-1.5">
          {DEMO_ACCOUNTS.map((acct) => (
            <button
              key={acct.email}
              type="button"
              disabled={busy}
              onClick={() => {
                setEmail(acct.email);
                setPassword(acct.password);
                void submit(acct.email, acct.password);
              }}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors hover:border-gray-200 hover:bg-white disabled:opacity-50"
            >
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium text-gray-900">
                  {acct.email}
                </span>
                <span className="block text-2xs text-gray-500">{acct.label}</span>
              </span>
              <span className="shrink-0 text-2xs font-medium uppercase tracking-label text-gray-400">
                Use
              </span>
            </button>
          ))}
        </div>
      </div> */}
    </AuthShell>
  );
}
