import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { applyCoupon, setIsCartOpen } = useCart();

  if (dismissed) return null;

  const handleQuickApply = () => {
    sound.playUiTick();
    applyCoupon('VALENCE10');
    setIsCartOpen(true);
  };

  return (
    <div className="relative border-b border-white/10 bg-[#161822] text-xs py-2 px-4 text-center text-zinc-300 flex items-center justify-center gap-3 max-h-10">
      <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <Sparkles className="h-3.5 w-3.5 text-[#ff5500] shrink-0" />
        <span className="font-semibold text-white">VALENCE TOURNAMENT SEASON:</span>
        <span>Use code</span>
        <button
          type="button"
          onClick={handleQuickApply}
          className="font-mono text-[#ff5500] font-bold underline hover:text-[#ff6a1a] cursor-pointer"
        >
          VALENCE10
        </button>
        <span>for 10% off custom battlestations & peripherals.</span>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="rounded p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
