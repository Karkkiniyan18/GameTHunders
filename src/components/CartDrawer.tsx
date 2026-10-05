import { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

export function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    couponCode,
    couponApplied,
    couponError,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) setInputCoupon('');
  };

  const handleCheckoutClick = () => {
    sound.playUiTick();
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          sound.playUiTick();
          setIsCartOpen(false);
        }}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-white/10 bg-[#0e1015] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-[#14161e]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#ff5500]" />
              <h2 className="text-base font-bold text-white font-display">
                Gear Crate
              </h2>
              <span className="font-mono text-xs text-zinc-400 tabular-nums">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playUiTick();
                setIsCartOpen(false);
              }}
              aria-label="Close cart drawer"
              className="rounded-md p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="border-b border-white/5 bg-[#12141c] px-5 py-2.5">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">
                {remainingForFreeShipping > 0
                  ? `Add $${remainingForFreeShipping.toFixed(0)} for Free Insured Freight`
                  : 'Free Express Shipping Unlocked!'}
              </span>
              <span className="text-[#ff5500] font-bold tabular-nums">
                ${subtotal.toFixed(0)} / ${freeShippingThreshold}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-[#ff5500] transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
                <p className="text-base font-medium text-zinc-300">Your crate is empty</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  Add peripherals, mechanical keyboards, or configure a custom liquid rig.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="py-4 flex gap-4 items-start">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#161822]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white font-display truncate">
                      {item.product.name}
                    </h3>

                    {item.selectedVariant && (
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                        {item.selectedVariant}
                      </p>
                    )}

                    {item.customRigSpecs && (
                      <p className="text-[11px] text-[#ff5500] mt-0.5 font-mono line-clamp-1">
                        Custom Rig: {item.customRigSpecs.gpu.name.split(' ')[2]} + {item.customRigSpecs.cpu.name.split(' ')[2]}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded border border-white/10 bg-white/5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono text-xs tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-white tabular-nums">
                          ${(item.unitPrice * item.quantity).toLocaleString()}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          aria-label="Remove item"
                          className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 bg-[#12141c] p-5 space-y-4">
              {/* Promo Code Form */}
              <div>
                {couponApplied ? (
                  <div className="flex items-center justify-between rounded-lg bg-[#ff5500]/10 border border-[#ff5500]/30 px-3 py-2 text-xs">
                    <span className="font-mono text-[#ff5500] font-semibold flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      PROMO APPLIED: {couponCode} (-${discount.toFixed(2)})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder='Coupon code (try "VALENCE10")'
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-white/15 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#ff5500]">
                    <span>Discount</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="text-white tabular-nums">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Sales Tax (8.25%)</span>
                  <span className="text-white tabular-nums">
                    ${((Math.max(0, subtotal - discount) * 0.0825)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-white">
                  <span className="font-sans">Total Order</span>
                  <span className="text-lg tabular-nums text-[#ff5500]">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#ff5500] py-3.5 px-4 text-sm font-bold text-white hover:bg-[#ff6a1a] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ff5500]/25"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>256-Bit Encrypted · 30-Day Zero-Risk Return Policy</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
