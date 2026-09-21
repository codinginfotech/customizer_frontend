import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { fetchCategories, fetchProducts } from '../../services/catalogService';
import type { Category, Product } from '../../types/catalog';
import { ProductCard } from '../products/ProductCard';
import { Skeleton } from '../../components/ui';

const STEPS = [
  {
    title: 'Choose the blank',
    text: 'Every SKU carries its own print areas, colourways and size run — measured, not approximated.',
  },
  {
    title: 'Compose the artwork',
    text: 'Type, uploads, shapes and graphics on a snapping canvas with live bleed and safe-zone guides.',
  },
  {
    title: 'Check it in 3D',
    text: 'Your artwork is projected onto the real product mesh. Rotate it, light it, catch problems early.',
  },
  {
    title: 'Send it to print',
    text: 'Export at 300 DPI with the cut contour intact, or order straight from the cart.',
  },
];

const SPECS = [
  { k: 'Output resolution', v: '300 DPI' },
  { k: 'Colour space', v: 'sRGB → CMYK profiled' },
  { k: 'File formats', v: 'PNG · SVG · PDF' },
  { k: 'Bleed & safe zone', v: 'Per print area' },
  { k: 'Max artwork size', v: '25 MB / upload' },
  { k: 'Preview', v: 'Real-time WebGL' },
];

export default function LandingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
    fetchProducts({ featured: true, pageSize: 8 })
      .then((r) => setFeatured(r.items))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <div>
      {/* ---------------------------------------------------------------- *
       * Hero — asymmetric split; the product sits in a technical frame
       * ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55]" aria-hidden />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f3d0ba 0%, transparent 65%)' }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-container items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              2D editor · 3D preview · print-ready output
            </p>

            <h1 className="mt-6 max-w-xl text-display font-semibold text-gray-900">
              Put your artwork on{' '}
              <span className="font-serif font-normal italic tracking-tight">anything</span> —
              exactly as printed.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
              Makely is a production customizer, not a mockup toy. Real print areas, real colour
              limits, real 300&nbsp;DPI files at the other end.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/products" className="btn-primary btn-lg group">
                Start designing
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary btn-lg">
                See how it works
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200">
              {[
                { k: 'Products', v: '15+' },
                { k: 'Print areas', v: '40+' },
                { k: 'Export DPI', v: '300' },
              ].map((s) => (
                <div key={s.k} className="bg-white px-4 py-3.5">
                  <dd className="text-xl font-semibold tabular tracking-tight text-gray-900">
                    {s.v}
                  </dd>
                  <dt className="mt-0.5 text-2xs uppercase tracking-label text-gray-500">{s.k}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Technical frame: the blank, annotated like a spec sheet */}
          <div className="lg:col-span-6">
            <figure className="relative mx-auto max-w-lg">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-surface-sunken">
                <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
                {/* corner registration marks */}
                {[
                  'left-4 top-4 border-l border-t',
                  'right-4 top-4 border-r border-t',
                  'left-4 bottom-4 border-b border-l',
                  'right-4 bottom-4 border-b border-r',
                ].map((pos) => (
                  <span
                    key={pos}
                    className={`absolute h-5 w-5 border-gray-300 ${pos}`}
                    aria-hidden
                  />
                ))}
                <img
                  src="/images/products/tshirt.svg"
                  alt="Custom t-shirt with the front print area highlighted"
                  className="relative h-full w-full object-contain p-10"
                />
                {/* the print-area rectangle, drawn over the blank */}
                <span
                  className="absolute left-1/2 top-[34%] h-[30%] w-[27%] -translate-x-1/2 rounded-[3px] border border-dashed border-brand-500/70 bg-brand-500/[0.06]"
                  aria-hidden
                />
              </div>

              <figcaption className="absolute -left-3 top-8 hidden rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-raised backdrop-blur sm:block">
                <p className="text-2xs uppercase tracking-label text-gray-500">Front print area</p>
                <p className="mt-0.5 text-sm font-medium tabular text-gray-900">
                  12″ × 14.7″ · 300 DPI
                </p>
              </figcaption>
              <figcaption className="absolute -right-3 bottom-10 hidden items-center gap-2.5 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-raised backdrop-blur sm:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-medium text-gray-900">3D preview live</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Categories — a quiet index row, not a card grid
       * ---------------------------------------------------------------- */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
            <span className="panel-title">Browse</span>
            {categories.length === 0
              ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)
              : categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/products?category=${c.slug}`}
                    className="group flex items-baseline gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {c.name}
                    <span className="text-2xs tabular text-gray-400">
                      {c._count?.products ?? 0}
                    </span>
                    <ArrowUpRight className="h-3 w-3 -translate-x-1 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Featured
       * ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex items-end justify-between gap-6 border-b border-gray-200 pb-5">
          <div>
            <p className="eyebrow">Selected blanks</p>
            <h2 className="mt-2 text-title font-semibold text-gray-900">Ready to customize</h2>
          </div>
          <Link
            to="/products"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-gray-900 sm:flex"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {featured === null
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-72" />)
            : featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * How it works — numbered editorial list on a rule
       * ---------------------------------------------------------------- */}
      <section id="how-it-works" className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">Workflow</p>
              <h2 className="mt-3 text-title font-semibold text-gray-900">
                Four steps from blank to press.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
                The editor enforces what the printer needs, so nothing gets rejected downstream.
              </p>
            </div>

            <ol className="lg:col-span-8">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-gray-200 py-6 last:border-b sm:gap-x-10"
                >
                  <span className="pt-0.5 text-2xs font-medium tabular tracking-label text-gray-400 transition-colors group-hover:text-brand-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-gray-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Specs — the credibility block
       * ---------------------------------------------------------------- */}
      <section id="specs" className="mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Output</p>
            <h2 className="mt-3 text-title font-semibold text-gray-900">
              Built for the print floor.
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                'Validation blocks low-resolution art before checkout',
                'Per-area bleed, safe zone and DPI enforced live',
                'Designs transfer between products without redrawing',
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:col-span-7">
            {SPECS.map((s) => (
              <div key={s.k} className="bg-white px-5 py-4">
                <dt className="text-2xs uppercase tracking-label text-gray-500">{s.k}</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * CTA — ink block, single accent
       * ---------------------------------------------------------------- */}
      <section className="border-t border-gray-200 bg-gray-950">
        <div className="relative mx-auto max-w-container overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-lg text-title font-semibold text-white">
                Your product. Your artwork. Print-ready in minutes.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">
                No design skills needed — start from a template or an empty canvas.
              </p>
            </div>
            <Link
              to="/products"
              className="btn btn-lg group shrink-0 bg-white text-gray-900 hover:bg-gray-100"
            >
              Start designing
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
