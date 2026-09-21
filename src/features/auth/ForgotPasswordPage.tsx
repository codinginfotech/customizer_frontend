import { FormEvent, useState } from 'react';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api, apiErrorMessage } from '../../services/apiClient';
import { Field, Spinner } from '../../components/ui';
import { AuthShell } from './AuthShell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={
        sent
          ? undefined
          : 'Enter the email on your account and we will send a link to set a new password.'
      }
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-medium text-gray-900 transition-colors hover:text-gray-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <MailCheck className="h-5 w-5 text-emerald-700" strokeWidth={1.8} />
          <p className="mt-3 text-sm leading-relaxed text-emerald-900">
            If an account exists for <strong className="font-medium">{email}</strong>, a reset link
            is on its way.
          </p>
          <p className="mt-2 text-xs text-emerald-800/80">
            In development the link is printed to the API console.
          </p>
        </div>
      ) : (
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
          <button type="submit" className="btn-primary btn-lg w-full" disabled={busy}>
            {busy && <Spinner className="h-4 w-4 text-white" />}
            Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  );
}
