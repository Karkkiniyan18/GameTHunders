import { ArrowRight, Cpu, Zap, Volume2 } from 'lucide-react';
import { HERO_ASSET } from '../data/products';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

export function Hero() {
  const { setIsRigBuilderOpen, setIsSwitchLabOpen } = useCart();

  const scrollToCatalog = () => {
    sound.playUiTick();
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0c10]">
      {/* Subtle ambient gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#ff5500]/25 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean unboxed metadata separator instead of pill badge */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 font-mono">
              <span className="text-[#ff5500]">Esports Grade</span>
              <span aria-hidden="true">·</span>
              <span>Sub-0.125ms Input</span>
              <span aria-hidden="true">·</span>
              <span>Factory Tested</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.08] text-balance">
              Engineered for the absolute edge.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              Custom borosilicate liquid loops, magnetic Hall effect actuation, and magnesium alloy peripherals. Zero bloatware, zero latency compromise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playUiTick();
                  setIsRigBuilderOpen(true);
                }}
                className="flex items-center gap-2 rounded-lg bg-[#ff5500] px-5 py-3 text-sm font-bold text-white hover:bg-[#ff6a1a] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ff5500]/20"
              >
                <Cpu className="h-4 w-4" />
                <span>Configure Custom Rig</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={scrollToCatalog}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <span>Browse Gear Catalog</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playLinearThock();
                  setIsSwitchLabOpen(true);
                }}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 hover:text-[#ff5500] transition-colors cursor-pointer"
              >
                <Volume2 className="h-4 w-4 text-[#ff5500]" />
                <span>Tactile Switch Simulator</span>
              </button>
            </div>

            {/* Proof metrics strictly adjacent */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                  0.125<span className="text-sm font-mono text-[#ff5500] ml-0.5">ms</span>
                </p>
                <p className="text-xs text-zinc-400 mt-1">Input Latency</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                  72<span className="text-sm font-mono text-[#ff5500] ml-0.5">hrs</span>
                </p>
                <p className="text-xs text-zinc-400 mt-1">Thermal Stress Run</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                  3<span className="text-sm font-mono text-[#ff5500] ml-0.5">yr</span>
                </p>
                <p className="text-xs text-zinc-400 mt-1">Hardware Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#14161d] shadow-2xl group">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={HERO_ASSET}
                  alt="VALENCE Flagship Liquid-Cooled Battlestation & Tournament Gear"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              {/* Scrim overlay with clean metadata card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
                      Battlestation Series 2026
                    </span>
                    <h2 className="text-xl font-bold text-white font-display mt-0.5">
                      The Apex Battlestation Lab
                    </h2>
                    <p className="text-xs text-zinc-300 mt-1">
                      Featuring custom borosilicate liquid cooling & QD-OLED 240Hz
                    </p>
                  </div>
                  <div className="pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playUiTick();
                        setIsRigBuilderOpen(true);
                      }}
                      className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-white/10 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                    >
                      <Zap className="h-3.5 w-3.5 text-[#ff5500]" />
                      <span>Customize Build</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
