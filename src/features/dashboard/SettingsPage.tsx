import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import { api, apiErrorMessage } from '../../services/apiClient';
import { Badge, Field, PageHeader, SectionCard, Spinner } from '../../components/ui';
import { formatDate } from '../../utils/format';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const dirty = name !== user?.name || Boolean(newPassword);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.put('/users/me', {
        ...(name !== user?.name ? { name } : {}),
        ...(newPassword ? { currentPassword, newPassword } : {}),
      });
      setUser({ ...user!, name: res.data.data.name });
      setCurrentPassword('');
      setNewPassword('');
      toast.success('Settings updated');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Update failed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Workspace"
        title="Account settings"
        description="Manage your profile and sign-in credentials."
      />

      <form onSubmit={onSubmit} className="mt-7 space-y-6">
        <SectionCard title="Profile">
          <div className="space-y-5">
            <Field label="Email" hint="Your email address is used to sign in and cannot be changed.">
              <div className="flex items-center gap-3">
                <input className="input" value={user?.email ?? ''} disabled />
                {user?.emailVerified && (
                  <Badge tone="success" dot>
                    Verified
                  </Badge>
                )}
              </div>
            </Field>

            <Field label="Full name" required>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                required
                autoComplete="name"
              />
            </Field>

            {user?.createdAt && (
              <p className="text-xs text-gray-500">
                Member since {formatDate(user.createdAt)}
                {user.role === 'ADMIN' && ' · Administrator'}
              </p>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Password"
          description="Leave blank to keep your current password."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Current password">
              <input
                type="password"
                className="input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Field>
            <Field label="New password" hint="At least 8 characters.">
              <input
                type="password"
                className="input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                autoComplete="new-password"
              />
            </Field>
          </div>
        </SectionCard>

        <div className="flex items-center justify-end gap-3">
          {dirty && <p className="text-xs text-gray-500">You have unsaved changes</p>}
          <button className="btn-primary" disabled={busy || !dirty}>
            {busy && <Spinner className="h-4 w-4 text-white" />}
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
