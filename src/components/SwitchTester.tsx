import { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface SwitchTesterProps {
  isOpen: boolean;
  onClose: () => void;
}

type SwitchCategory = 'magnetic' | 'linear' | 'tactile' | 'clicky' | 'mouse';

interface SwitchProfile {
  id: SwitchCategory;
  name: string;
  feel: string;
  actuationTravel: string;
  operatingForce: string;
  acousticTone: string;
  soundFn: () => void;
  description: string;
  recommendedProduct: string;
}

const SWITCH_PROFILES: SwitchProfile[] = [
  {
    id: 'magnetic',
    name: 'VALENCE MagneTek Hall-Effect',
    feel: 'Continuous Rapid Trigger / Zero Friction',
    actuationTravel: '0.1mm – 4.0mm Dynamic',
    operatingForce: '30g Initial / 50g Bottom-out',
    acousticTone: 'Dampened Crisp Pop (Subtle)',
    soundFn: () => sound.playMagneticPop(),
    description: 'Analog electromagnetic Hall-effect sensor. Key resets the instant your finger moves 0.05mm upwards for instant counter-strafing.',
    recommendedProduct: 'kb-magnetek-75'
  },
  {
    id: 'linear',
    name: 'Krytox-Lubed Linear Obsidian 45g',
    feel: 'Silky Smooth Downstroke / Zero Bump',
    actuationTravel: '1.8mm Actuation / 3.6mm Total',
    operatingForce: '45g Actuation / 58g Bottom-out',
    acousticTone: 'Deep Ceramic Acoustic Thock',
    soundFn: () => sound.playLinearThock(),
    description: 'Factory hand-lubricated with Krytox GPL 205g0. Polished POM stem on polycarbonate housing for deep acoustic resonance.',
    recommendedProduct: 'kb-magnetek-75'
  },
  {
    id: 'tactile',
    name: 'Bespoke Tactile Panda 58g',
    feel: 'Pronounced Tactile Peak at 0.5mm',
    actuationTravel: '2.0mm Actuation / 3.8mm Total',
    operatingForce: '58g Tactile Bump / 65g Bottom-out',
    acousticTone: 'Satisfying Solid Snappy Clack',
    soundFn: () => sound.playTactileClick(),
    description: 'Prominent, rounded tactile bump right at top of travel with zero pre-travel slop. Perfect for precise keystroke confidence.',
    recommendedProduct: 'kb-magnetek-75'
  },
  {
    id: 'clicky',
    name: 'Precision Sonic Click 60g',
    feel: 'Dual-Click Spring Bar Impulse',
    actuationTravel: '1.8mm Actuation / 4.0mm Total',
    operatingForce: '50g Actuation / 60g Click Peak',
    acousticTone: 'High-Pitch Tournament Click',
    soundFn: () => sound.playClickySnap(),
    description: 'Acoustic click-bar mechanism generating distinct audio feedback precisely at electrical actuation point.',
    recommendedProduct: 'kb-magnetek-75'
  },
  {
    id: 'mouse',
    name: 'Aerox Optical Microswitch V2',
    feel: 'Infrared Beam Breaker / Zero Debounce',
    actuationTravel: '0.65mm Tactical Travel',
    operatingForce: '62g Crisp Rebound',
    acousticTone: 'Lightweight Snap',
    soundFn: () => sound.playMouseClick(),
    description: 'Light-speed optical shutter eliminates mechanical contact bounce and guarantees zero double-clicking for 100M clicks.',
    recommendedProduct: 'mouse-aerox-38'
  }
];

export function SwitchTester({ isOpen, onClose }: SwitchTesterProps) {
  const { setSelectedProduct, soundEnabled } = useCart();
  const [activeProfile, setActiveProfile] = useState<SwitchProfile>(SWITCH_PROFILES[0]);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>('SPACE');
  const [pressCount, setPressCount] = useState<number>(0);

  const testKeys = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'SPACE', 'SHIFT', 'CTRL'];

  const triggerKey = (keyLabel: string) => {
    activeProfile.soundFn();
    setLastKeyPressed(keyLabel);
    setPressCount((c) => c + 1);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const keyUpper = e.key.toUpperCase();
      activeProfile.soundFn();
      setLastKeyPressed(keyUpper === ' ' ? 'SPACE' : keyUpper);
      setPressCount((c) => c + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeProfile]);

  if (!isOpen) return null;

  const targetProd = PRODUCTS.find((p) => p.id === activeProfile.recommendedProduct);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-[#101218] text-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14161e]">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-[#ff5500]" />
            <span className="text-sm font-black tracking-wider text-white font-display uppercase">
              Acoustic & Tactile Switch Lab
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playUiTick();
              onClose();
            }}
            aria-label="Close switch lab"
            className="rounded-md p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Switch Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Select Switch Architecture to Audition
              </span>
              {!soundEnabled && (
                <span className="text-xs text-amber-400 font-mono">
                  Audio muted in top bar — unmute to hear clicks
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SWITCH_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => {
                    profile.soundFn();
                    setActiveProfile(profile);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    activeProfile.id === profile.id
                      ? 'border-[#ff5500] bg-[#ff5500]/10 text-white font-semibold'
                      : 'border-white/5 bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                  }`}
                >
                  <p className="text-xs font-bold leading-tight font-display">{profile.name.split(' ')[1] || profile.name}</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">{profile.acousticTone.split(' ')[0]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Keyboard Test Bench */}
          <div className="rounded-xl border border-white/10 bg-[#161823] p-6 text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-400">
                Click keys or press any key on your physical keyboard
              </span>
              <span className="text-xs font-mono text-[#ff5500] tabular-nums">
                Actuations Tested: {pressCount}
              </span>
            </div>

            {/* Simulated Keycaps Grid */}
            <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto py-4">
              {testKeys.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => triggerKey(k)}
                  className={`h-14 sm:h-16 ${
                    k === 'SPACE' ? 'w-44 sm:w-56' : k === 'SHIFT' ? 'w-24 sm:w-28' : 'w-14 sm:w-16'
                  } rounded-lg border border-white/10 bg-[#0d0e13] font-mono text-sm font-bold text-white shadow-md transition-all active:scale-95 active:bg-[#ff5500] active:text-white cursor-pointer flex flex-col items-center justify-center select-none ${
                    lastKeyPressed === k ? 'border-[#ff5500] text-[#ff5500] shadow-[#ff5500]/30' : ''
                  }`}
                >
                  <span>{k}</span>
                  <span className="text-[9px] text-zinc-500 font-sans font-normal">
                    {activeProfile.operatingForce.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Current Registered Key: <span className="text-white font-bold">{lastKeyPressed}</span>
            </p>
          </div>

          {/* Switch Specifications & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-display">
                {activeProfile.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeProfile.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Actuation Travel</span>
                  <span className="text-white font-semibold">{activeProfile.actuationTravel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Tactile Feel</span>
                  <span className="text-white font-semibold">{activeProfile.feel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Spring Weight</span>
                  <span className="text-white font-semibold">{activeProfile.operatingForce}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Acoustic Profile</span>
                  <span className="text-[#ff5500] font-semibold">{activeProfile.acousticTone}</span>
                </div>
              </div>
            </div>

            {/* Recommended Product with this switch */}
            {targetProd && (
              <div className="rounded-xl border border-white/10 bg-[#161822] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#ff5500] mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Equipped on Tournament Peripherals</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    {targetProd.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {targetProd.tagline}
                  </p>
                  <p className="font-mono text-lg font-bold text-white mt-3 tabular-nums">
                    ${targetProd.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playUiTick();
                    setSelectedProduct(targetProd);
                    onClose();
                  }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#ff5500] py-2.5 px-4 text-xs font-bold text-white hover:bg-[#ff6a1a] transition-all cursor-pointer"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
