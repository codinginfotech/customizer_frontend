import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api, apiErrorMessage } from '../../services/apiClient';
import { EmptyState, Spinner } from '../../components/ui';
import { AuthShell } from './AuthShell';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      toast.success('Password updated — sign in with your new password.');
      navigate('/login');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Reset failed'));
    } finally {
      setBusy(false);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-24">
        <EmptyState
          title="This reset link is invalid"
          description="The link may have expired or already been used. Request a fresh one to continue."
          action={
            <Link to="/forgot-password" className="btn-primary">
              Request a new link
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <AuthShell title="Choose a new password" subtitle="Make it something you have not used before.">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="label" htmlFor="reset-password">
            New password
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={reveal ? 'text' : 'password'}
              required
              minLength={8}
              className="input pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 8 characters"
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
        <button type="submit" className="btn-primary btn-lg w-full" disabled={busy}>
          {busy && <Spinner className="h-4 w-4 text-white" />}
          Update password
        </button>
      </form>
    </AuthShell>
  );
}
