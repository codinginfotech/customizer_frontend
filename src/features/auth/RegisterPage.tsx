import { FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import { apiErrorMessage } from '../../services/apiClient';
import { Field, Spinner } from '../../components/ui';
import { AuthFooterLink, AuthShell } from './AuthShell';

/** Cheap, honest strength read-out — length, letters, digits, symbols. */
function scorePassword(pw: string): { score: number; label: string } {
  if (!pw) return { score: 0, label: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^\w\s]/.test(pw)) score++;
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  return { score, label: labels[Math.min(score, 5)] };
}

export default function RegisterPage() {
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);

  const strength = useMemo(() => scorePassword(password), [password]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await register(name, email, password);
      toast.success('Welcome — your account is ready.');
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from || '/dashboard', { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Registration failed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Save designs, reorder in a click, and keep your uploads in one place."
      footer={<AuthFooterLink prompt="Already have an account?" to="/login" label="Sign in" />}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <Field label="Full name">
          <input
            required
            minLength={2}
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Alex Rivera"
          />
        </Field>

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
          <label className="label" htmlFor="new-password">
            Password
          </label>
          <div className="relative">
            <input
              id="new-password"
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

          <div className="mt-2.5 flex items-center gap-2.5">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={clsx(
                    'h-1 flex-1 rounded-full transition-colors duration-300',
                    i < strength.score
                      ? strength.score <= 2
                        ? 'bg-amber-500'
                        : strength.score <= 3
                          ? 'bg-brand-500'
                          : 'bg-emerald-500'
                      : 'bg-gray-200',
                  )}
                />
              ))}
            </div>
            <span className="w-16 shrink-0 text-right text-2xs text-gray-500">
              {strength.label}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-gray-500">
            At least 8 characters, with a letter and a number.
          </p>
        </div>

        <button type="submit" className="btn-primary btn-lg w-full" disabled={busy}>
          {busy && <Spinner className="h-4 w-4 text-white" />}
          Create account
        </button>
      </form>
    </AuthShell>
  );
}
