import { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, Volume2, Check, Heart, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isComparing,
    setIsCartOpen
  } = useCart();

  if (!product) return null;

  const defaultVariant = product.variants?.options[0]?.name || '';
  const [selectedVariant, setSelectedVariant] = useState<string>(defaultVariant);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');

  const selectedOption = product.variants?.options.find(o => o.name === selectedVariant);
  const modifier = selectedOption?.priceModifier || 0;
  const currentPrice = product.price + modifier;

  const isFavorited = isWishlisted(product.id);
  const inComparison = isComparing(product.id);

  const handleSoundTest = () => {
    if (product.switchType === 'magnetic') {
      sound.playMagneticPop();
    } else if (selectedVariant.toLowerCase().includes('tactile')) {
      sound.playTactileClick();
    } else if (product.category === 'mice') {
      sound.playMouseClick();
    } else {
      sound.playLinearThock();
    }
  };

  const handleAddAndCheckout = (openDrawer = false) => {
    addToCart(product, quantity, selectedVariant || undefined);
    if (openDrawer) {
      setIsCartOpen(true);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-[#12141a] text-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14161e]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <span>Hardware PDP</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#ff5500] font-semibold">{product.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                isFavorited ? 'bg-[#ff5500] text-white' : 'hover:bg-white/10 text-zinc-400'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => toggleCompare(product)}
              aria-label="Compare"
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                inComparison ? 'bg-[#ff5500] text-white' : 'hover:bg-white/10 text-zinc-400'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playUiTick();
                onClose();
              }}
              aria-label="Close dialog"
              className="rounded-md p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Left */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0b0e]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Interactive Acoustic Audio Trigger if tactile gear */}
              <button
                type="button"
                onClick={handleSoundTest}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 px-4 text-xs font-semibold text-zinc-300 hover:bg-[#ff5500]/10 hover:text-[#ff5500] hover:border-[#ff5500]/30 transition-all cursor-pointer"
              >
                <Volume2 className="h-4 w-4 text-[#ff5500]" />
                <span>Test Acoustic Switch Feedback</span>
              </button>

              {/* Warranty and Trust Guarantee strip */}
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#171922] p-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#ff5500] shrink-0" />
                  <span>{product.warrantyYears}-Year Zero Compromise Warranty</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#171922] p-2.5">
                  <Truck className="h-4 w-4 text-[#ff5500] shrink-0" />
                  <span>Free Express Insured Delivery</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Right */}
            <div className="md:col-span-6 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Price Baseline */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                  ${currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-zinc-500 line-through tabular-nums">
                    ${(product.originalPrice + modifier).toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono font-medium ml-2">
                  Ready to Dispatch
                </span>
              </div>

              {/* Variant Selector if present */}
              {product.variants && (
                <div className="mt-5 border-t border-white/10 pt-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    {product.variants.type}: <span className="text-white font-sans font-medium">{selectedVariant}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          sound.playUiTick();
                          setSelectedVariant(option.name);
                        }}
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
                          selectedVariant === option.name
                            ? 'bg-[#ff5500] text-white font-semibold shadow-md shadow-[#ff5500]/25'
                            : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        {option.name}
                        {option.priceModifier ? (
                          <span className="ml-1 opacity-80 font-mono">
                            (+${option.priceModifier})
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="mt-6 border-t border-white/10 pt-5 flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playUiTick();
                      setQuantity(q => Math.max(1, q - 1));
                    }}
                    className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-semibold text-sm tabular-nums text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playUiTick();
                      setQuantity(q => q + 1);
                    }}
                    className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddAndCheckout(true)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ff5500] py-3 px-5 text-sm font-bold text-white hover:bg-[#ff6a1a] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ff5500]/20"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag · ${(currentPrice * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Tabs for Features vs Technical Specs */}
              <div className="mt-8 border-t border-white/10 pt-4">
                <div className="flex items-center gap-4 border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playUiTick();
                      setActiveTab('overview');
                    }}
                    className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'text-[#ff5500] border-b-2 border-[#ff5500]'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Key Features
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playUiTick();
                      setActiveTab('specs');
                    }}
                    className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'text-[#ff5500] border-b-2 border-[#ff5500]'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Full Technical Sheet
                  </button>
                </div>

                <div className="mt-4">
                  {activeTab === 'overview' ? (
                    <ul className="space-y-2">
                      {product.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-[#ff5500] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <dl className="divide-y divide-white/5 text-xs font-mono">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="py-2 flex justify-between gap-4">
                          <dt className="text-zinc-400 font-sans">{key}</dt>
                          <dd className="text-zinc-200 font-mono text-right tabular-nums">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
