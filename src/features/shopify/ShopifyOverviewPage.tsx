import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { PageHeader, SectionCard, StatTile } from '../../components/ui';
import type { ShopContext } from './ShopifyAdminRoutes';

export default function ShopifyOverviewPage({ ctx }: { ctx: ShopContext }) {
  const { shop } = ctx;
  const steps = [
    {
      done: shop.stats.mappings > 0,
      title: 'Link a product',
      text: 'Choose which Shopify products are customizable and which customizer template each one uses.',
      to: '/shopify/admin/products',
      cta: 'Open products',
    },
    {
      done: false,
      title: 'Add the button to your theme',
      text: 'In the theme editor, add the "Customize button" app block to your product page template.',
      href: `https://${shop.shopDomain}/admin/themes/current/editor?template=product&addAppBlockId=customize-button`,
      cta: 'Open theme editor',
    },
    {
      done: shop.stats.orders > 0,
      title: 'Receive customized orders',
      text: 'Every order with a personalised item shows up under Orders with print-ready downloads.',
      to: '/shopify/admin/orders',
      cta: 'View orders',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={shop.name ?? shop.shopDomain}
        title="Product customizer"
        description="Shoppers design on your product pages; you download production files from the orders list."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile label="Customizable products" value={String(shop.stats.mappings)} />
        <StatTile label="Shopper designs" value={String(shop.stats.customizations)} hint="Drafts and ordered" />
        <StatTile label="Customized orders" value={String(shop.stats.orders)} />
      </div>

      <SectionCard title="Setup" description="Three steps to go live.">
        <ol className="divide-y divide-gray-100">
          {steps.map((step) => (
            <li key={step.title} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
              {step.done ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-gray-300" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{step.text}</p>
              </div>
              {step.to ? (
                <Link to={step.to} className="btn-secondary btn-sm shrink-0">
                  {step.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <a href={step.href} target="_top" rel="noreferrer" className="btn-secondary btn-sm shrink-0">
                  {step.cta} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
}
