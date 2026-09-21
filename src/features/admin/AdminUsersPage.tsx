import { useEffect, useState } from 'react';
import { Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminUser, adminFetchUsers, adminUpdateUser } from '../../services/adminService';
import { apiErrorMessage } from '../../services/apiClient';
import { useAuthStore } from '../../stores/authStore';
import { Badge, EmptyState, PageHeader, Skeleton, Tooltip } from '../../components/ui';
import { formatDate } from '../../utils/format';
import { useDebouncedValue } from '../../hooks/useDebounce';

export default function AdminUsersPage() {
  const me = useAuthStore((s) => s.user);
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search, 300);

  useEffect(() => {
    setUsers(null);
    adminFetchUsers({ search: debounced || undefined })
      .then((r) => setUsers(r.items))
      .catch(() => setUsers([]));
  }, [debounced]);

  async function update(
    user: AdminUser,
    input: { role?: 'USER' | 'ADMIN'; status?: 'ACTIVE' | 'INACTIVE' },
  ) {
    try {
      const updated = await adminUpdateUser(user.id, input);
      setUsers((prev) => prev?.map((u) => (u.id === user.id ? updated : u)) ?? null);
      toast.success('User updated');
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Users"
        description="Roles and access. You cannot change your own role or status."
        actions={
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              strokeWidth={1.8}
            />
            <input
              className="input w-60 pl-9"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
      />

      <div className="card mt-7 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Joined</th>
                <th className="text-right">Designs</th>
                <th className="text-right">Orders</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users === null ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-4 py-3">
                      <Skeleton className="h-10" />
                    </td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6">
                    <EmptyState
                      compact
                      icon={<Users className="h-5 w-5" strokeWidth={1.8} />}
                      title="No users found"
                      description="Try a different search term."
                    />
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                          {user.name.slice(0, 1).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="flex items-center gap-2 truncate font-medium text-gray-900">
                            {user.name}
                            {user.id === me?.id && <Badge tone="ink">You</Badge>}
                          </p>
                          <p className="truncate text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="text-right tabular text-gray-600">{user._count.designs}</td>
                    <td className="text-right tabular text-gray-600">{user._count.orders}</td>
                    <td>
                      <select
                        className="input h-8 w-28 text-xs"
                        value={user.role}
                        disabled={user.id === me?.id}
                        onChange={(e) => update(user, { role: e.target.value as 'USER' | 'ADMIN' })}
                        aria-label={`Role for ${user.name}`}
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td>
                      <Tooltip
                        label={
                          user.id === me?.id
                            ? 'You cannot disable yourself'
                            : user.status === 'ACTIVE'
                              ? 'Disable account'
                              : 'Enable account'
                        }
                      >
                        <button
                          disabled={user.id === me?.id}
                          className="align-middle disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={() =>
                            update(user, {
                              status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                            })
                          }
                        >
                          <Badge tone={user.status === 'ACTIVE' ? 'success' : 'danger'} dot>
                            {user.status === 'ACTIVE' ? 'Active' : 'Disabled'}
                          </Badge>
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
