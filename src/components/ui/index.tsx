import {
  ButtonHTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Check, ChevronLeft, ChevronRight, Loader2, PackageOpen, X } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Feedback
 * ------------------------------------------------------------------ */

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      aria-hidden
      className={clsx('animate-spin', className ?? 'h-4 w-4 text-current opacity-80')}
    />
  );
}

export function PageSpinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24">
      <Spinner className="h-5 w-5 text-gray-400" />
      <p className="text-xs uppercase tracking-label text-gray-400">{label ?? 'Loading'}</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={clsx('skeleton rounded-lg', className)} />;
}

/** Repeated skeleton rows — keeps loading states from being hand-rolled everywhere. */
export function SkeletonList({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={className ?? 'h-16'} />
      ))}
    </div>
  );
}

const BADGE_TONES = {
  neutral: 'border-gray-200 bg-gray-50 text-gray-600',
  ink: 'border-gray-900/10 bg-gray-900 text-white',
  accent: 'border-brand-200 bg-brand-50 text-brand-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  danger: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
} as const;

export type BadgeTone = keyof typeof BADGE_TONES;

export function Badge({
  children,
  className,
  tone,
  dot,
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
  dot?: boolean;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-2xs font-medium leading-5',
        className ?? BADGE_TONES[tone ?? 'neutral'],
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  compact,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/60 bg-grid px-6 text-center',
        compact ? 'py-10' : 'py-20',
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-card">
        {icon ?? <PackageOpen className="h-5 w-5" />}
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-gray-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Overlays
 * ------------------------------------------------------------------ */

/**
 * Modal with scroll-lock, Escape-to-close and a focus trap. Enters on a short
 * scale so it reads as attached to the click rather than teleported in.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    // Move focus in without stealing it from an autofocused field.
    const t = window.setTimeout(() => {
      if (!panelRef.current?.contains(document.activeElement)) panelRef.current?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/45 p-0 backdrop-blur-[2px] animate-fade-in sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={clsx(
          'flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-overlay outline-none animate-scale-in sm:rounded-2xl',
          sizes[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? labelId : undefined}
      >
        {(title || description) && (
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
            <div className="min-w-0">
              {title && (
                <h2 id={labelId} className="truncate text-sm font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="-mr-1 -mt-0.5 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </header>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 scroll-thin">{children}</div>
        {footer && (
          <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  danger = true,
  busy = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  busy?: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn-ghost" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button
            className={danger ? 'btn-danger' : 'btn-primary'}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy && <Spinner className="h-3.5 w-3.5 text-white" />}
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-gray-600">{message}</p>
    </Modal>
  );
}

/* ------------------------------------------------------------------ *
 * Forms
 * ------------------------------------------------------------------ */

export function Field({
  label,
  children,
  hint,
  error,
  required,
  className,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label">
        {label}
        {required && <span className="ml-0.5 text-brand-600">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-700">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{hint}</p>
      )}
    </div>
  );
}

/** Label + control on one row — the dense form pattern used in the inspector. */
export function InlineField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('flex items-center justify-between gap-3', className)}>
      <span className="shrink-0 text-xs font-medium text-gray-600">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 disabled:opacity-40',
        checked ? 'bg-gray-900' : 'bg-gray-300',
      )}
    >
      <span
        className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out"
        style={{ transform: checked ? 'translateX(18px)' : 'translateX(2px)' }}
      />
    </button>
  );
}

/** Segmented control — replaces radio pills and two-state toggles app-wide. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  size = 'md',
  dark,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode; title?: string }[];
  size?: 'sm' | 'md';
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={clsx(
        'inline-flex items-center gap-0.5 rounded-lg p-0.5',
        dark ? 'bg-white/[.06]' : 'border border-gray-200 bg-gray-100/70',
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            title={opt.title}
            onClick={() => onChange(opt.value)}
            className={clsx(
              'rounded-md font-medium transition-all duration-150',
              size === 'sm' ? 'px-2 py-1 text-2xs' : 'px-3 py-1.5 text-xs',
              active
                ? dark
                  ? 'bg-white/[.14] text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-card'
                : dark
                  ? 'text-zinc-400 hover:text-zinc-100'
                  : 'text-gray-500 hover:text-gray-900',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Layout & structure
 * ------------------------------------------------------------------ */

/** The standard page header: eyebrow / title / description / actions. */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-gray-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Card with a hairline header strip — used for every panel-like block. */
export function SectionCard({
  title,
  description,
  actions,
  children,
  footer,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={clsx('card overflow-hidden', className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3.5">
          <div className="min-w-0">
            {title && <h2 className="text-sm font-semibold text-gray-900">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={bodyClassName ?? 'p-5'}>{children}</div>
      {footer && (
        <footer className="border-t border-gray-100 bg-gray-50/60 px-5 py-3">{footer}</footer>
      )}
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-400">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 text-gray-300" aria-hidden />}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Metric tile for dashboards. Big tabular figure, quiet label. */
export function StatTile({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  hint?: string;
}) {
  return (
    <div className="card group relative overflow-hidden p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-2xs font-medium uppercase tracking-label text-gray-500">{label}</p>
        {icon && <span className="text-gray-300 transition-colors group-hover:text-brand-500">{icon}</span>}
      </div>
      <p className="mt-3 text-2xl font-semibold tabular tracking-tight text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // Windowed page list with ellipses so 40 pages never wrap the layout.
  const pages: (number | 'gap')[] = [];
  const push = (n: number) => !pages.includes(n) && pages.push(n);
  push(1);
  if (page - 2 > 2) pages.push('gap');
  for (let n = Math.max(2, page - 1); n <= Math.min(totalPages - 1, page + 1); n++) push(n);
  if (page + 2 < totalPages - 1) pages.push('gap');
  if (totalPages > 1) push(totalPages);

  const btn =
    'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-medium transition-colors';

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        className={clsx(btn, 'text-gray-500 hover:bg-gray-100 disabled:opacity-35')}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="px-1 text-xs text-gray-300">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={clsx(
              btn,
              p === page
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        className={clsx(btn, 'text-gray-500 hover:bg-gray-100 disabled:opacity-35')}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ------------------------------------------------------------------ *
 * Misc
 * ------------------------------------------------------------------ */

/** CSS-only tooltip. No portal, no library — wraps any trigger. */
export function Tooltip({
  label,
  children,
  side = 'top',
}: {
  label: string;
  children: ReactNode;
  side?: 'top' | 'bottom';
}) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={clsx(
          'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-2xs font-medium text-white opacity-0 shadow-raised transition-opacity duration-150 group-hover/tip:opacity-100',
          side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
        )}
      >
        {label}
      </span>
    </span>
  );
}

/** Swatch button used for product colours in the catalog and the studio. */
export function ColorSwatch({
  color,
  selected,
  onClick,
  title,
  size = 'md',
}: {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  title?: string;
  size?: 'sm' | 'md';
}) {
  const isLight = isLightColor(color);
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title ?? color}
      aria-pressed={selected}
      className={clsx(
        'relative flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-105',
        size === 'sm' ? 'h-5 w-5' : 'h-8 w-8',
        selected && 'ring-2 ring-gray-900 ring-offset-2',
      )}
      style={{
        backgroundColor: color,
        boxShadow: isLight ? 'inset 0 0 0 1px rgba(26,24,22,.16)' : 'inset 0 0 0 1px rgba(0,0,0,.1)',
      }}
    >
      {selected && (
        <Check
          className={clsx(size === 'sm' ? 'h-2.5 w-2.5' : 'h-4 w-4')}
          style={{ color: isLight ? '#1a1816' : '#fff' }}
          strokeWidth={3}
        />
      )}
    </button>
  );
}

function isLightColor(hex: string): boolean {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return false;
  const [r, g, b] = [m[1], m[2], m[3]].map((h) => parseInt(h, 16));
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7;
}

/* ------------------------------------------------------------------ *
 * Dropdown menu (click-outside + Escape), used by the header + row menus
 * ------------------------------------------------------------------ */

const MenuCtx = createContext<{ close: () => void }>({ close: () => undefined });

export function Menu({
  trigger,
  children,
  align = 'right',
  className,
}: {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <MenuCtx.Provider value={{ close: () => setOpen(false) }}>
          <div
            role="menu"
            className={clsx(
              'absolute z-50 mt-1.5 min-w-44 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-overlay animate-scale-in',
              align === 'right' ? 'right-0' : 'left-0',
              className,
            )}
          >
            {children}
          </div>
        </MenuCtx.Provider>
      )}
    </div>
  );
}

export const MenuItem = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode; danger?: boolean }
>(function MenuItem({ icon, danger, className, onClick, children, ...rest }, ref) {
  const { close } = useContext(MenuCtx);
  return (
    <button
      ref={ref}
      role="menuitem"
      {...rest}
      onClick={(e) => {
        close();
        onClick?.(e);
      }}
      className={clsx(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
        danger
          ? 'text-red-700 hover:bg-red-50'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        className,
      )}
    >
      {icon && <span className="text-gray-400">{icon}</span>}
      {children}
    </button>
  );
});

export function MenuLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  const { close } = useContext(MenuCtx);
  return (
    <Link
      to={to}
      role="menuitem"
      onClick={close}
      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      {icon && <span className="text-gray-400">{icon}</span>}
      {children}
    </Link>
  );
}

export function MenuSeparator() {
  return <div className="my-1 h-px bg-gray-100" />;
}
