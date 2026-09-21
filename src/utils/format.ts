export function formatPrice(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  IN_PRODUCTION: 'In production',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

/** Badge classes per order status — bordered + tinted, matching <Badge> tones. */
export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: 'border-amber-200 bg-amber-50 text-amber-800',
  CONFIRMED: 'border-sky-200 bg-sky-50 text-sky-800',
  IN_PRODUCTION: 'border-brand-200 bg-brand-50 text-brand-800',
  SHIPPED: 'border-indigo-200 bg-indigo-50 text-indigo-800',
  DELIVERED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  CANCELLED: 'border-gray-200 bg-gray-100 text-gray-500',
};

/** Relative time for "edited 3 hours ago" style meta lines. */
export function formatRelative(value: string | Date): string {
  const then = new Date(value).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(value);
}
