import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Split auth layout: form on the left at a comfortable measure, a quiet
 * "spec sheet" panel on the right that keeps the brand present without
 * resorting to stock photography.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid flex-1 lg:min-h-[calc(100vh-60px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-14 sm:px-8 lg:px-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm leading-relaxed text-gray-500">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-sm text-gray-500">{footer}</div>}
        </div>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-gray-200 bg-white lg:block">
        <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f3d0ba 0%, transparent 65%)' }}
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-between p-12">
          <p className="eyebrow">Makely studio</p>

          <div className="relative mx-auto w-full max-w-sm">
            <img
              src="/images/products/tshirt.svg"
              alt=""
              aria-hidden
              className="w-full drop-shadow-sm"
            />
            <span
              className="absolute left-1/2 top-[34%] h-[30%] w-[27%] -translate-x-1/2 rounded-[3px] border border-dashed border-brand-500/70 bg-brand-500/[0.06]"
              aria-hidden
            />
          </div>

          <div>
            <p className="max-w-sm text-lg leading-snug tracking-tight text-gray-900">
              Design on the real product, export the file the press actually needs.
            </p>
            <div className="mt-6 grid max-w-sm grid-cols-3 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200">
              {[
                { k: 'DPI', v: '300' },
                { k: 'Products', v: '15+' },
                { k: 'Preview', v: '3D' },
              ].map((s) => (
                <div key={s.k} className="bg-white px-4 py-3">
                  <p className="text-base font-semibold tabular text-gray-900">{s.v}</p>
                  <p className="mt-0.5 text-2xs uppercase tracking-label text-gray-500">{s.k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function AuthFooterLink({
  prompt,
  to,
  label,
}: {
  prompt: string;
  to: string;
  label: string;
}) {
  return (
    <p>
      {prompt}{' '}
      <Link
        to={to}
        className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900"
      >
        {label}
      </Link>
    </p>
  );
}
