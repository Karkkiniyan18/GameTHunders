import { ShieldCheck, Cpu, Flame, Layers } from 'lucide-react';
import rigImg from '../assets/images/product_liquid_cooled_rig_1791194980045.jpg';

export function Craftsmanship() {
  return (
    <section id="craftsmanship-section" className="border-b border-white/10 bg-[#0e1016] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Manifest */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#14161f] shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={rigImg}
                  alt="Precision liquid-cooled engineering chamber"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div>
                  <span className="text-[11px] font-mono text-[#ff5500] uppercase tracking-wider">
                    Acoustic & Thermal Protocol
                  </span>
                  <p className="text-white font-display font-bold text-lg">
                    Sub-62°C Under Max Synthetic Load
                  </p>
                </div>
                <div className="rounded-lg bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-right">
                  <span className="font-mono text-xs text-emerald-400 font-bold tabular-nums">
                    &lt; 28 dBA
                  </span>
                  <p className="text-[10px] text-zinc-400 font-mono">Full Load Noise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
              <span className="text-[#ff5500]">02. Architecture & QA</span>
              <span aria-hidden="true">·</span>
              <span>Esports Fabrication</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
              Zero compromises in silicon, acoustics, or latency.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Every VALENCE chassis is machined from solid 6063 aerospace aluminum, hand-assembled in our cleanroom labs, and subjected to a mandatory 72-hour thermal stress torture test.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-white/5 bg-[#14161f] p-4">
                <Flame className="h-5 w-5 text-[#ff5500] mb-2" />
                <h3 className="text-sm font-bold text-white font-display">Borosilicate Loop</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Rigid glass tubing with custom copper heatblocks prevents coolant evaporation and maintains pure thermal conduction.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#14161f] p-4">
                <Cpu className="h-5 w-5 text-[#ff5500] mb-2" />
                <h3 className="text-sm font-bold text-white font-display">Silicon Binning</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Every CPU and GPU is hand-tested to verify voltage curve stability at sustained tournament boost frequencies.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#14161f] p-4">
                <Layers className="h-5 w-5 text-[#ff5500] mb-2" />
                <h3 className="text-sm font-bold text-white font-display">Multi-Layer Damping</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Poron foam and high-density silicone gaskets eliminate high-frequency ping and mechanical rattle.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#14161f] p-4">
                <ShieldCheck className="h-5 w-5 text-[#ff5500] mb-2" />
                <h3 className="text-sm font-bold text-white font-display">3-Year Zero-Dead Guarantee</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Immediate advance replacement on displays and core components with zero out-of-pocket shipping fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
