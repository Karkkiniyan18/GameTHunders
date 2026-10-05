import { useState } from 'react';
import { X, Check, Zap, ShoppingBag, ArrowRight } from 'lucide-react';
import { RIG_OPTIONS } from '../data/rigComponents';
import { CustomRigComponent, Product } from '../types';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';
import rigImg from '../assets/images/product_liquid_cooled_rig_1791194980045.jpg';

interface RigBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RigBuilder({ isOpen, onClose }: RigBuilderProps) {
  const { addToCart, setIsCartOpen } = useCart();

  const [chassis, setChassis] = useState<CustomRigComponent>(RIG_OPTIONS.chassis[0]);
  const [cpu, setCpu] = useState<CustomRigComponent>(RIG_OPTIONS.cpu[0]);
  const [gpu, setGpu] = useState<CustomRigComponent>(RIG_OPTIONS.gpu[0]);
  const [ram, setRam] = useState<CustomRigComponent>(RIG_OPTIONS.ram[0]);
  const [cooler, setCooler] = useState<CustomRigComponent>(RIG_OPTIONS.cooler[0]);
  const [storage, setStorage] = useState<CustomRigComponent>(RIG_OPTIONS.storage[0]);
  const [psu, setPsu] = useState<CustomRigComponent>(RIG_OPTIONS.psu[0]);
  const [cables, setCables] = useState<CustomRigComponent>(RIG_OPTIONS.cables[0]);

  if (!isOpen) return null;

  const baseLaborAndBurnIn = 350; // Custom hardline assembly, 72hr burn-in stress test, OS install
  const totalPrice =
    baseLaborAndBurnIn +
    chassis.price +
    cpu.price +
    gpu.price +
    ram.price +
    cooler.price +
    storage.price +
    psu.price +
    cables.price;

  const totalWattage =
    chassis.wattage +
    cpu.wattage +
    gpu.wattage +
    ram.wattage +
    cooler.wattage +
    storage.wattage +
    50; // Motherboard + fans baseline

  const psuCapacity = psu.id.includes('1200')
    ? 1200
    : psu.id.includes('1000')
    ? 1000
    : 850;

  const wattageHeadroom = psuCapacity - totalWattage;
  const isPsuAdequate = wattageHeadroom >= 150;

  const handleAddRigToCart = () => {
    sound.playCartAdd();
    const customProduct: Product = {
      id: `custom-rig-${Date.now()}`,
      name: `VALENCE Bespoke Battlestation (${cpu.name.split(' ')[2]} + ${gpu.name.split(' ')[3]})`,
      category: 'rigs',
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      tagline: `${cpu.name.split(' ')[2]} · ${gpu.name.split(' ')[2]} ${gpu.name.split(' ')[3]} · ${ram.name.split(' ')[0]} · ${psu.name.split(' ')[0]}`,
      description: `Hand-built custom battlestation with ${cooler.name}, ${chassis.name}, and 72-hour factory burn-in verification.`,
      image: rigImg,
      inStock: true,
      stockCount: 1,
      warrantyYears: 3,
      keyFeatures: [
        `Custom loop: ${cooler.name}`,
        `Chassis: ${chassis.name}`,
        `Factory hand-sleeved cabling: ${cables.name}`,
        `Full 72-hour thermal stress validation certificate`
      ],
      specs: {
        'Processor': cpu.name,
        'Graphics': gpu.name,
        'Memory': ram.name,
        'Cooling': cooler.name,
        'Storage': storage.name,
        'Power Supply': psu.name,
        'Chassis': chassis.name
      }
    };

    addToCart(customProduct, 1, undefined, {
      chassis,
      cpu,
      gpu,
      ram,
      cooler,
      storage,
      psu,
      cables
    });

    setIsCartOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-[#101218] text-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14161e]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-wider text-white font-display uppercase">
              Bespoke Battlestation Architect
            </span>
            <span className="hidden sm:inline text-zinc-500 font-mono text-xs">/</span>
            <span className="hidden sm:inline text-xs font-mono text-[#ff5500]">
              Real-Time Thermal & Wattage Verification
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playUiTick();
              onClose();
            }}
            aria-label="Close custom builder"
            className="rounded-md p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Builder Content: 2-column layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Component Selectors (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Graphics Card */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
                    01. Graphics Processing Unit (GPU)
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Est. {gpu.wattage}W TDP
                  </span>
                </div>
                <div className="space-y-2">
                  {RIG_OPTIONS.gpu.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playUiTick();
                        setGpu(item);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        gpu.id === item.id
                          ? 'border-[#ff5500] bg-[#ff5500]/10 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold">{item.name}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{item.description}</p>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold tabular-nums text-white shrink-0">
                        ${item.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: CPU Processor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
                    02. Central Processor (CPU)
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Est. {cpu.wattage}W TDP
                  </span>
                </div>
                <div className="space-y-2">
                  {RIG_OPTIONS.cpu.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playUiTick();
                        setCpu(item);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        cpu.id === item.id
                          ? 'border-[#ff5500] bg-[#ff5500]/10 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold">{item.name}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{item.description}</p>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold tabular-nums text-white shrink-0">
                        ${item.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Chassis */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-2">
                  03. Enclosure & Chassis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {RIG_OPTIONS.chassis.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playUiTick();
                        setChassis(item);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        chassis.id === item.id
                          ? 'border-[#ff5500] bg-[#ff5500]/10 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-xs font-bold">{item.name.split(' ')[1]} {item.name.split(' ')[2]}</p>
                      <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
                      <p className="font-mono text-xs font-bold text-[#ff5500] mt-2 tabular-nums">
                        ${item.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Cooling System */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-2">
                  04. Thermal Architecture & Liquid Cooling
                </h3>
                <div className="space-y-2">
                  {RIG_OPTIONS.cooler.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playUiTick();
                        setCooler(item);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        cooler.id === item.id
                          ? 'border-[#ff5500] bg-[#ff5500]/10 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold">{item.name}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{item.description}</p>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold tabular-nums text-white shrink-0">
                        ${item.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Memory & Storage Quick Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-2">
                    05. DDR5 Memory Kit
                  </h3>
                  <div className="space-y-1.5">
                    {RIG_OPTIONS.ram.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          sound.playUiTick();
                          setRam(item);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex justify-between ${
                          ram.id === item.id
                            ? 'border-[#ff5500] bg-[#ff5500]/10 text-white font-semibold'
                            : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                        <span className="font-mono tabular-nums text-white ml-2">${item.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-2">
                    06. High-Speed Storage
                  </h3>
                  <div className="space-y-1.5">
                    {RIG_OPTIONS.storage.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          sound.playUiTick();
                          setStorage(item);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex justify-between ${
                          storage.id === item.id
                            ? 'border-[#ff5500] bg-[#ff5500]/10 text-white font-semibold'
                            : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{item.name.split(' ')[0]} {item.name.split(' ')[1]} {item.name.split(' ')[2]}</span>
                        <span className="font-mono tabular-nums text-white ml-2">${item.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 7: Power Supply & Custom Sleeved Cables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-2">
                    07. Power Supply Unit (PSU)
                  </h3>
                  <div className="space-y-1.5">
                    {RIG_OPTIONS.psu.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          sound.playUiTick();
                          setPsu(item);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex justify-between ${
                          psu.id === item.id
                            ? 'border-[#ff5500] bg-[#ff5500]/10 text-white font-semibold'
                            : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{item.name.split(' ')[0]} {item.name.split(' ')[2]}</span>
                        <span className="font-mono tabular-nums text-white ml-2">${item.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff5500] mb-2">
                    08. Cable Sleeving & Combs
                  </h3>
                  <div className="space-y-1.5">
                    {RIG_OPTIONS.cables.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          sound.playUiTick();
                          setCables(item);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex justify-between ${
                          cables.id === item.id
                            ? 'border-[#ff5500] bg-[#ff5500]/10 text-white font-semibold'
                            : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{item.name.split('(')[0]}</span>
                        <span className="font-mono tabular-nums text-white ml-2">
                          {item.price === 0 ? 'Included' : `+$${item.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Panel (5 Cols) */}
            <div className="lg:col-span-5 sticky top-0 rounded-xl border border-white/10 bg-[#161822] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#0e1015] border border-white/5 mb-4">
                  <img
                    src={rigImg}
                    alt="Custom Liquid Cooled Battlestation"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-display font-bold text-lg text-white">
                    Live System Manifest
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    Components Verified
                  </span>
                </div>

                {/* Thermal and Wattage Bar */}
                <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-[#ff5500]" />
                      Estimated System Draw
                    </span>
                    <span className="text-white font-bold tabular-nums">
                      {totalWattage}W / {psuCapacity}W
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isPsuAdequate ? 'bg-[#ff5500]' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (totalWattage / psuCapacity) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                    Headroom: <span className="text-emerald-400 font-semibold">{wattageHeadroom}W</span> (Safely within 80% optimal efficiency curve)
                  </p>
                </div>

                {/* Bill of materials */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 truncate pr-2">GPU: {gpu.name.split(' ')[2]} {gpu.name.split(' ')[3]}</span>
                    <span className="font-mono tabular-nums">${gpu.price}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 truncate pr-2">CPU: {cpu.name.split(' ')[2]}</span>
                    <span className="font-mono tabular-nums">${cpu.price}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 truncate pr-2">Cooler: {cooler.name.split(' ')[1]}</span>
                    <span className="font-mono tabular-nums">${cooler.price}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 truncate pr-2">RAM: {ram.name.split(' ')[0]}</span>
                    <span className="font-mono tabular-nums">${ram.price}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 truncate pr-2">72hr Thermal Burn-in & Assembly</span>
                    <span className="font-mono tabular-nums">${baseLaborAndBurnIn}</span>
                  </div>
                </div>
              </div>

              {/* Total & Action */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs font-mono uppercase text-zinc-400">Total Battlestation Price</span>
                  <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddRigToCart}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#ff5500] py-3.5 px-4 text-sm font-bold text-white hover:bg-[#ff6a1a] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ff5500]/25"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Lock Configuration & Add to Bag</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] text-center text-zinc-400 mt-2">
                  Includes 3-Year Zero-Compromise Onsite Warranty & White-Glove Crate Delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
