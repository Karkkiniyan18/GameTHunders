import { ShoppingBag, Volume2, VolumeX, SlidersHorizontal, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

interface NavbarProps {
  onSearchClick: () => void;
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const {
    cartCount,
    setIsCartOpen,
    soundEnabled,
    toggleSound,
    setIsRigBuilderOpen,
    setIsSwitchLabOpen,
    compareList,
    setIsCompareOpen
  } = useCart();

  const handleNavClick = (anchorId: string) => {
    sound.playUiTick();
    const elem = document.getElementById(anchorId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0c10]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sound.playUiTick();
          }}
          className="text-xl font-black tracking-widest text-white font-display uppercase transition-opacity hover:opacity-90"
        >
          VALENCE
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <button
            onClick={() => handleNavClick('catalog-section')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Hardware
          </button>
          <button
            onClick={() => {
              sound.playUiTick();
              setIsRigBuilderOpen(true);
            }}
            className="hover:text-[#ff5500] transition-colors cursor-pointer py-1"
          >
            Rig Builder
          </button>
          <button
            onClick={() => {
              sound.playUiTick();
              setIsSwitchLabOpen(true);
            }}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Switch Lab
          </button>
          <button
            onClick={() => handleNavClick('craftsmanship-section')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Engineering
          </button>
          <button
            onClick={() => handleNavClick('reviews-section')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Esports Verified
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            type="button"
            onClick={() => {
              sound.playUiTick();
              onSearchClick();
            }}
            aria-label="Search hardware"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] text-zinc-500 bg-white/5 px-1 py-0.5 rounded font-mono">
              /
            </kbd>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute mechanical switch sounds' : 'Enable mechanical switch sounds'}
            aria-label="Toggle mechanical clicks"
            className="rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[#ff5500]" />
            ) : (
              <VolumeX className="h-4 w-4 text-zinc-500" />
            )}
          </button>

          {/* Compare Indicator if items active */}
          {compareList.length > 0 && (
            <button
              type="button"
              onClick={() => {
                sound.playUiTick();
                setIsCompareOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-md bg-[#1a1d26] px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-[#252834] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#ff5500]" />
              <span className="hidden sm:inline">Compare</span>
              <span className="font-mono tabular-nums text-[#ff5500]">
                ({compareList.length})
              </span>
            </button>
          )}

          {/* Cart Bag Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playUiTick();
              setIsCartOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-[#ff5500] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#ff6a1a] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-[#ff5500]/20"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Bag</span>
            <span className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[11px] tabular-nums font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
