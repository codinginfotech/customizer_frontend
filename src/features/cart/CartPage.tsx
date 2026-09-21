import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Pencil, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../stores/cartStore';
import { apiErrorMessage } from '../../services/apiClient';
import { EmptyState, PageSpinner } from '../../components/ui';
import { formatPrice } from '../../utils/format';

export default function CartPage() {
  const { cart, load, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    void load().catch(() => undefined);
  }, [load]);

  if (!cart) return <PageSpinner label="Loading cart" />;

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-24">
        <EmptyState
          icon={<ShoppingBag className="h-5 w-5" strokeWidth={1.8} />}
          title="Your cart is empty"
          description="Customize a product and it will show up here, artwork and all."
          action={
            <Link to="/products" className="btn-primary">
              Browse catalog
            </Link>
          }
        />
      </div>
    );
  }

  const itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-container flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <header className="border-b border-gray-200 pb-6">
        <p className="eyebrow">Cart</p>
        <h1 className="mt-2 text-title font-semibold text-gray-900">
          {itemCount} item{itemCount === 1 ? '' : 's'} ready to print
        </h1>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {cart.items.map((item) => (
              <li key={item.id} className="flex gap-4 py-5 sm:gap-6">
                <Link
                  to={`/products/${item.product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-surface-sunken p-2 transition-colors hover:border-gray-300 sm:h-28 sm:w-28"
                >
                  {(item.design?.previewImage || item.product.image) && (
                    <img
                      src={item.design?.previewImage ?? item.product.image ?? ''}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      {item.variant && (
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                          {item.variant.color && (
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: item.variant.color,
                                boxShadow: 'inset 0 0 0 1px rgba(26,24,22,.18)',
                              }}
                            />
                          )}
                          {[item.variant.colorName, item.variant.size]
                            .filter(Boolean)
                            .join(' · ') || item.variant.name}
                        </p>
                      )}
                      {item.design && (
                        <Link
                          to={`/designer/${item.product.slug}?design=${item.design.id}`}
                          className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit “{item.design.name}”
                        </Link>
                      )}
                    </div>
                    <p className="shrink-0 text-sm font-medium tabular text-gray-900">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                    <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-l-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1).catch((e) =>
                            toast.error(apiErrorMessage(e)),
                          )
                        }
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center text-sm font-medium tabular text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-r-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1).catch((e) =>
                            toast.error(apiErrorMessage(e)),
                          )
                        }
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-red-50 hover:text-red-700"
                      onClick={() =>
                        removeItem(item.id).catch((e) => toast.error(apiErrorMessage(e)))
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="card sticky top-[76px] overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-3.5">
              <h2 className="text-sm font-semibold text-gray-900">Order summary</h2>
            </div>
            <div className="space-y-2.5 px-5 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium tabular text-gray-900">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-400">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-400">Calculated at checkout</span>
              </div>
              <div className="!mt-4 flex items-baseline justify-between border-t border-gray-100 pt-4">
                <span className="text-sm font-medium text-gray-900">Estimated total</span>
                <span className="text-lg font-semibold tabular tracking-tight text-gray-900">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
            </div>
            <div className="space-y-2 border-t border-gray-100 bg-gray-50/60 px-5 py-4">
              <button className="btn-primary btn-lg group w-full" onClick={() => navigate('/checkout')}>
                Checkout
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <Link to="/products" className="btn-ghost w-full">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
