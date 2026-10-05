import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

export function CompareDrawer() {
  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    removeFromCompare,
    addToCart
  } = useCart();

  if (!isCompareOpen || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => {
          sound.playUiTick();
          setIsCompareOpen(false);
        }}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-3xl border-l border-white/10 bg-[#0e1015] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14161e]">
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Hardware Side-by-Side Comparison
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Comparing {compareList.length} of 3 active tournament units
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playUiTick();
                setIsCompareOpen(false);
              }}
              aria-label="Close comparison drawer"
              className="rounded-md p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Comparison Matrix Table */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-6">
              {compareList.map((product) => (
                <div key={product.id} className="flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#14161e] border border-white/10 mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 rounded bg-black/60 p-1 text-zinc-400 hover:text-red-400 cursor-pointer"
                        title="Remove from comparison"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-white font-display line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#ff5500] font-mono font-bold mt-1">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#ff5500] py-2 px-3 text-xs font-semibold text-white hover:bg-[#ff6a1a] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Spec attributes compare rows */}
            <div className="mt-6 space-y-4 text-xs font-mono">
              <div className="border-b border-white/5 pb-3">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans block mb-2">Category</span>
                <div className="grid grid-cols-3 gap-4 text-zinc-200">
                  {compareList.map(p => (
                    <span key={p.id} className="capitalize">{p.category}</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-white/5 pb-3">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans block mb-2">Warranty</span>
                <div className="grid grid-cols-3 gap-4 text-zinc-200">
                  {compareList.map(p => (
                    <span key={p.id}>{p.warrantyYears} Years Replacement</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-white/5 pb-3">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans block mb-2">Stock Availability</span>
                <div className="grid grid-cols-3 gap-4">
                  {compareList.map(p => (
                    <span key={p.id} className={p.inStock ? 'text-emerald-400' : 'text-red-400'}>
                      {p.inStock ? `In Stock (${p.stockCount} left)` : 'Backorder'}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans block mb-2">Core Specifications</span>
                <div className="grid grid-cols-3 gap-4 text-zinc-300">
                  {compareList.map(p => (
                    <div key={p.id} className="space-y-1 text-[11px]">
                      {Object.entries(p.specs).slice(0, 4).map(([k, v]) => (
                        <div key={k}>
                          <span className="text-zinc-500">{k}:</span> <span className="text-white">{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
