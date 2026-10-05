import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight, Printer, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { OrderConfirmation } from '../types';
import { sound } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const {
    cart,
    subtotal,
    discount,
    shipping,
    total,
    clearCart,
    recentOrder,
    setRecentOrder
  } = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');

  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@tournament.gg',
    phone: '+1 (555) 839-2041',
    address: '742 Evergreen Battlestation Way',
    city: 'Seattle',
    postalCode: '98101',
    country: 'United States',
    shippingMethod: 'Express Insured Freight (2-3 Business Days)',
    paymentMethod: 'Credit / Debit Card (Stripe Encrypted)',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/29',
    cardCvc: '•••'
  });

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCartAdd();

    const orderId = `VAL-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `TRK-VALENCE-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const dateFormatted = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const order: OrderConfirmation = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      items: cart.map(item => ({
        id: item.cartId,
        name: item.product.name,
        quantity: item.quantity,
        price: item.unitPrice,
        variant: item.selectedVariant
      })),
      subtotal,
      discount,
      shipping,
      tax: Math.max(0, subtotal - discount) * 0.0825,
      total,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      estimatedDelivery: dateFormatted,
      trackingNumber
    };

    setRecentOrder(order);
    setStep('success');
    clearCart();

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#ffffff', '#10b981', '#3b82f6']
      });
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-[#101218] text-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14161e]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#ff5500]" />
            <span className="text-sm font-black tracking-wider text-white font-display uppercase">
              {step === 'form' ? 'Secure Tournament Checkout' : 'Order Confirmed · Preparing Dispatch'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playUiTick();
              onClose();
              if (step === 'success') {
                setStep('form');
              }
            }}
            aria-label="Close checkout modal"
            className="rounded-md p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Summary Strip */}
              <div className="rounded-xl border border-white/5 bg-[#161823] p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-zinc-400">Total Due Upon Dispatch</p>
                  <p className="text-2xl font-bold font-mono text-white tabular-nums">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-emerald-400">● 256-bit TLS Encrypted</span>
                  <span aria-hidden="true">·</span>
                  <span>Free Returns</span>
                </div>
              </div>

              {/* Section 1: Customer & Delivery Details */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-3">
                  01. Recipient & Battlestation Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-zinc-400 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white font-mono focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Method */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-3">
                  02. Insured Freight Logistics
                </h3>
                <div className="space-y-2">
                  {[
                    { title: 'Express Insured Freight (2-3 Business Days)', price: 'FREE ($150+)', desc: 'Zero-shock foam packaging with signature required.' },
                    { title: 'Priority Overnight Air (Next Business Day)', price: '+$35.00', desc: 'Guaranteed morning priority air dispatch.' },
                    { title: 'White-Glove Crate Delivery & Desk Placement', price: '+$85.00', desc: 'Two-person team unpacks and positions rig on desk.' }
                  ].map((method) => (
                    <label
                      key={method.title}
                      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.shippingMethod === method.title
                          ? 'border-[#ff5500] bg-[#ff5500]/10 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={formData.shippingMethod === method.title}
                          onChange={() => setFormData({ ...formData, shippingMethod: method.title })}
                          className="mt-1 text-[#ff5500] focus:ring-[#ff5500]"
                        />
                        <div>
                          <p className="text-xs font-bold">{method.title}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{method.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white shrink-0 ml-3">
                        {method.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-3">
                  03. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  {[
                    'Credit / Debit Card (Stripe Encrypted)',
                    'Apple Pay / Google Pay',
                    'Cash on Delivery / Wire'
                  ].map((pMethod) => (
                    <button
                      key={pMethod}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pMethod })}
                      className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                        formData.paymentMethod === pMethod
                          ? 'border-[#ff5500] bg-[#ff5500]/10 text-white font-semibold'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {pMethod.split(' ')[0]} {pMethod.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod.includes('Card') && (
                  <div className="rounded-lg border border-white/5 bg-[#14161f] p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                      <CreditCard className="h-4 w-4 text-[#ff5500]" />
                      <span>Card Details</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="col-span-2 rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white font-mono text-center"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#ff5500] py-3.5 px-4 text-sm font-bold text-white hover:bg-[#ff6a1a] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ff5500]/25"
                >
                  <span>Authorize Order · ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Step: Order Confirmation Receipt */
            recentOrder && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                {/* Confirmation Banner */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-2" />
                  <h3 className="text-xl font-black text-white font-display">
                    Order {recentOrder.orderId} Confirmed
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Your battlestation order has been entered into the fabrication queue.
                  </p>
                  <p className="text-xs font-mono text-[#ff5500] mt-2">
                    Est. Arrival by {recentOrder.estimatedDelivery}
                  </p>
                </div>

                {/* Delivery Tracking Timeline */}
                <div className="rounded-xl border border-white/10 bg-[#161822] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-zinc-400">Real-Time Logistics Status</span>
                    <span className="text-xs font-mono text-zinc-400">Tracking: {recentOrder.trackingNumber}</span>
                  </div>

                  <div className="relative flex items-center justify-between">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
                    
                    {[
                      { label: 'Order Placed', status: 'done', desc: 'Verified' },
                      { label: 'Thermal Stress & QA', status: 'active', desc: '72hr Burn-in' },
                      { label: 'Insured Dispatch', status: 'pending', desc: 'Air Freight' },
                      { label: 'Battlestation Delivery', status: 'pending', desc: recentOrder.estimatedDelivery }
                    ].map((st, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center">
                        <div
                          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            st.status === 'done'
                              ? 'bg-emerald-500 text-black'
                              : st.status === 'active'
                              ? 'bg-[#ff5500] text-white ring-4 ring-[#ff5500]/20 animate-pulse'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {i + 1}
                        </div>
                        <p className="text-[11px] font-semibold text-white mt-1.5">{st.label}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Receipt Breakdown */}
                <div className="rounded-xl border border-white/10 bg-[#14161f] p-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <h4 className="text-xs font-mono uppercase text-zinc-400">Manifest Summary</h4>
                    <span className="text-xs font-mono text-zinc-400">Sent to: {recentOrder.customer.email}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {recentOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-white/5">
                        <div>
                          <span className="font-semibold text-white">{item.quantity}x {item.name}</span>
                          {item.variant && <span className="text-zinc-400 ml-2 font-mono">({item.variant})</span>}
                        </div>
                        <span className="font-mono text-white tabular-nums">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1 text-xs font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">${recentOrder.subtotal.toLocaleString()}</span>
                    </div>
                    {recentOrder.discount > 0 && (
                      <div className="flex justify-between text-[#ff5500]">
                        <span>Promotional Discount</span>
                        <span>-${recentOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping Method ({recentOrder.shippingMethod.split(' ')[0]})</span>
                      <span className="text-white">{recentOrder.shipping === 0 ? 'FREE' : `$${recentOrder.shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span className="font-sans">Total Paid</span>
                      <span className="text-[#ff5500] tabular-nums">
                        ${recentOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Print & Return actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Order Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playUiTick();
                      onClose();
                      setStep('form');
                    }}
                    className="flex items-center gap-2 rounded-lg bg-[#ff5500] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#ff6a1a] cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Return to Hardware Storefront</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
