import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { sound } from '../utils/audio';

interface CatalogProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export function Catalog({ searchQuery, setSearchQuery, searchInputRef }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Hardware' },
    { id: 'rigs', label: 'Custom Rigs' },
    { id: 'keyboards', label: 'Keyboards' },
    { id: 'mice', label: 'Gaming Mice' },
    { id: 'audio', label: 'Esports Audio' },
    { id: 'displays', label: 'Displays' },
    { id: 'accessories', label: 'Mats & Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesSpecs = Object.values(product.specs).some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesSpecs) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, inStockOnly, searchQuery, sortBy]);

  const handleCategoryChange = (cat: ProductCategory) => {
    sound.playUiTick();
    setSelectedCategory(cat);
  };

  const handleResetFilters = () => {
    sound.playUiTick();
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="border-b border-white/10 bg-[#0b0c10] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              <span className="text-[#ff5500]">01. Product Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Tournament Certified</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Hardware Lineup 2026
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-mono">
            Zero bloatware drivers. All peripherals feature onboard flash memory for tournament regulations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#12141c] p-3 sm:p-4 mb-8">
          {/* Interactive Category Tabs (Functional buttons per constitution 1.A) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#ff5500] text-white font-semibold shadow-sm shadow-[#ff5500]/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search, Sort, Stock Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search specs, RTX 5090, 8000Hz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff5500] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            {/* In Stock Only Toggle */}
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  sound.playUiTick();
                  setInStockOnly(e.target.checked);
                }}
                className="rounded border-white/10 text-[#ff5500] focus:ring-[#ff5500] bg-white/5"
              />
              <span className="whitespace-nowrap">In Stock</span>
            </label>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  sound.playUiTick();
                  setSortBy(e.target.value as any);
                }}
                className="rounded-lg border border-white/10 bg-[#161822] px-3 py-1.5 text-xs text-zinc-200 focus:border-[#ff5500] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Hardware</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-[#14161f] py-16 text-center">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
            <h3 className="text-base font-bold text-white font-display">No hardware matched your criteria</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, clearing stock filters, or browsing other categories.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#ff5500] px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff6a1a] transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
