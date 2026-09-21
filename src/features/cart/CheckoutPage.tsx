import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Info, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../stores/cartStore';
import { createOrder, ShippingAddressInput } from '../../services/catalogService';
import { apiErrorMessage } from '../../services/apiClient';
import { Breadcrumbs, Field, PageSpinner, Spinner } from '../../components/ui';
import { formatPrice } from '../../utils/format';
import type { Order } from '../../types/catalog';

const EMPTY_ADDRESS: ShippingAddressInput = {
  fullName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  phone: '',
};

export default function CheckoutPage() {
  const { cart, load, clearLocal } = useCartStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<Order | null>(null);

  useEffect(() => {
    void load().catch(() => undefined);
  }, [load]);

  if (placed) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-24 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
          <Check className="h-5 w-5 text-emerald-700" strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">Order placed</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Your designs are locked in exactly as you made them. We will email production updates as
          the order moves.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 text-left">
          <div className="bg-white px-4 py-3">
            <dt className="text-2xs uppercase tracking-label text-gray-500">Order number</dt>
            <dd className="mt-1 text-sm font-medium tabular text-gray-900">{placed.orderNumber}</dd>
          </div>
          <div className="bg-white px-4 py-3">
            <dt className="text-2xs uppercase tracking-label text-gray-500">Total</dt>
            <dd className="mt-1 text-sm font-medium tabular text-gray-900">
              {formatPrice(placed.total)}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex justify-center gap-2.5">
          <Link to={`/dashboard/orders/${placed.id}`} className="btn-primary">
            View order
          </Link>
          <Link to="/products" className="btn-secondary">
            Keep designing
          </Link>
        </div>
      </div>
    );
  }

  if (!cart) return <PageSpinner label="Loading checkout" />;
  if (cart.items.length === 0) {
    navigate('/cart', { replace: true });
    return null;
  }

  const field = (
    key: keyof ShippingAddressInput,
    label: string,
    required = true,
    span2 = false,
    autoComplete?: string,
  ) => (
    <Field label={label} required={required} className={span2 ? 'sm:col-span-2' : ''}>
      <input
        className="input"
        required={required}
        autoComplete={autoComplete}
        value={address[key] ?? ''}
        onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
      />
    </Field>
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const order = await createOrder(address);
      clearLocal();
      setPlaced(order);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not place order'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-container flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Breadcrumbs items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mt-4 text-title font-semibold text-gray-900">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <form onSubmit={onSubmit} className="lg:col-span-7">
          <section>
            <h2 className="text-sm font-semibold text-gray-900">Shipping address</h2>
            <p className="mt-1 text-xs text-gray-500">Where the finished goods should arrive.</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {field('fullName', 'Full name', true, true, 'name')}
              {field('line1', 'Address line 1', true, true, 'address-line1')}
              {field('line2', 'Address line 2', false, true, 'address-line2')}
              {field('city', 'City', true, false, 'address-level2')}
              {field('state', 'State / Province', true, false, 'address-level1')}
              {field('postalCode', 'Postal code', true, false, 'postal-code')}
              {field('country', 'Country', true, false, 'country-name')}
              {field('phone', 'Phone', false, true, 'tel')}
            </div>
          </section>

          <div className="mt-8 flex gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <p className="text-xs leading-relaxed text-gray-600">
              Payment capture is intentionally stubbed in this build — orders are created{' '}
              <span className="font-medium text-gray-900">unpaid</span> and ready for a gateway
              hookup (Stripe, Razorpay, …).
            </p>
          </div>

          <button className="btn-primary btn-lg mt-6 w-full" disabled={busy}>
            {busy ? <Spinner className="h-4 w-4 text-white" /> : <Lock className="h-4 w-4" />}
            Place order
          </button>
        </form>

        <div className="lg:col-span-5">
          <div className="card sticky top-[76px] overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-3.5">
              <h2 className="text-sm font-semibold text-gray-900">Order summary</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {cart.items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-surface-sunken p-1">
                    {(item.design?.previewImage || item.product.image) && (
                      <img
                        src={item.design?.previewImage ?? item.product.image ?? ''}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-gray-900">
                      {item.product.name}
                    </span>
                    <span className="block truncate text-xs text-gray-500">
                      Qty {item.quantity}
                      {item.design ? ` · ${item.design.name}` : ''}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium tabular text-gray-900">
                    {formatPrice(item.totalPrice)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-gray-900">Subtotal</span>
                <span className="text-lg font-semibold tabular tracking-tight text-gray-900">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                Tax and shipping are calculated server-side when the order is placed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
