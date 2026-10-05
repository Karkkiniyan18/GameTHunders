import React from 'react';
import { ShoppingBag, Eye, Heart, SlidersHorizontal, Volume2 } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    setSelectedProduct,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isComparing
  } = useCart();

  const isFavorited = isWishlisted(product.id);
  const inComparison = isComparing(product.id);

  const handleSoundPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.switchType === 'magnetic') {
      sound.playMagneticPop();
    } else if (product.category === 'mice') {
      sound.playMouseClick();
    } else {
      sound.playLinearThock();
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => {
        sound.playUiTick();
        setSelectedProduct(product);
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#14161d] p-3 sm:p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#ff5500]/40 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
    >
      {/* Top Image Container (approx 65%-75% visual weight) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#0e1015]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient vignette for media depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Quick action overlay buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 transition-opacity">
          {/* Wishlist button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isFavorited ? 'Remove from saved' : 'Save product'}
            className={`rounded-md p-1.5 backdrop-blur-md transition-colors cursor-pointer ${
              isFavorited
                ? 'bg-[#ff5500] text-white'
                : 'bg-black/50 text-zinc-300 hover:bg-black/80 hover:text-white'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Compare button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            aria-label={inComparison ? 'In compare list' : 'Add to compare'}
            className={`rounded-md p-1.5 backdrop-blur-md transition-colors cursor-pointer ${
              inComparison
                ? 'bg-[#ff5500] text-white'
                : 'bg-black/50 text-zinc-300 hover:bg-black/80 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>

          {/* Sound Preview Button for Tactile Gear */}
          {(product.switchType || product.category === 'mice' || product.category === 'audio') && (
            <button
              type="button"
              onClick={handleSoundPreview}
              title="Preview tactile acoustic click"
              aria-label="Sound preview"
              className="rounded-md p-1.5 bg-black/50 text-zinc-300 backdrop-blur-md hover:bg-[#ff5500] hover:text-white transition-colors cursor-pointer"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Stock / Limited status - single clean text indicator */}
        <div className="absolute bottom-2.5 left-2.5 text-[11px] font-mono font-medium text-zinc-300">
          {product.stockCount <= 5 ? (
            <span className="text-amber-400 font-semibold">Only {product.stockCount} in batch</span>
          ) : (
            <span className="text-emerald-400">In Stock · Ready to Ship</span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          {/* Clean unboxed category & spec metadata with separator */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.warrantyYears}yr warranty</span>
          </div>

          <h3 className="mt-1 text-base font-bold text-white group-hover:text-[#ff5500] transition-colors leading-snug font-display line-clamp-1">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Pricing Baseline and Quick Actions */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-white tabular-nums">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-zinc-500 line-through tabular-nums">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playUiTick();
                setSelectedProduct(product);
              }}
              aria-label="View specs"
              className="rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label="Add to bag"
              className="flex items-center gap-1 rounded-md bg-[#ff5500]/15 px-2.5 py-1.5 text-xs font-semibold text-[#ff5500] hover:bg-[#ff5500] hover:text-white transition-all cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
