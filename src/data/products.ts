import { Product } from '../types';
import rigImg from '../assets/images/product_liquid_cooled_rig_1791194980045.jpg';
import keyboardImg from '../assets/images/product_mech_keyboard_1791194991150.jpg';
import mouseImg from '../assets/images/product_wireless_mouse_1791195002658.jpg';
import headsetImg from '../assets/images/product_esports_headset_1791195012515.jpg';
import heroImg from '../assets/images/hero_gaming_battlestation_1791194966488.jpg';

export const HERO_ASSET = heroImg;

export const PRODUCTS: Product[] = [
  {
    id: 'rig-apex-one',
    name: 'VALENCE Apex One Custom Liquid Rig',
    category: 'rigs',
    price: 3899,
    originalPrice: 4199,
    rating: 4.95,
    reviewsCount: 88,
    tagline: 'Dual-Chamber Hardline Liquid Cooling · RTX 5090 · Ryzen 7 9800X3D',
    description: 'The pinnacle of competitive battlestation engineering. Custom bent borosilicate hardline liquid loop, hand-sleeved stealth cabling, and sub-62°C thermal ceilings under maximum synthetic load.',
    image: rigImg,
    inStock: true,
    stockCount: 4,
    warrantyYears: 3,
    keyFeatures: [
      'Custom 360mm copper radiator with EK-Quantum velocity block',
      'Hand-sleeved carbon-titanium 12VHPWR & 24-pin cable combs',
      'Dual chamber isolation keeping GPU intake air unheated',
      'Full factory 72-hour burn-in stress test report included'
    ],
    specs: {
      'Processor': 'AMD Ryzen 7 9800X3D (8C/16T, up to 5.2GHz)',
      'Graphics': 'NVIDIA GeForce RTX 5090 32GB GDDR7',
      'Memory': '64GB (2x32GB) DDR5-6400 CL30 Dominator Titanium',
      'Storage': '4TB PCIe 5.0 NVMe SSD (12,400 MB/s Read)',
      'Power Supply': '1200W ATX 3.1 80+ Titanium Full Modular',
      'Chassis': 'CNC Anodized Aluminum & Smoked Tempered Glass'
    },
    variants: {
      type: 'Coolant Aesthetic',
      options: [
        { id: 'amber-cryo', name: 'Cryo Amber Transparent', priceModifier: 0, inStock: true },
        { id: 'pure-distilled', name: 'Pure Distilled Stealth', priceModifier: 0, inStock: true },
        { id: 'uv-cobalt', name: 'UV Cobalt Blue', priceModifier: 50, inStock: true }
      ]
    }
  },
  {
    id: 'kb-magnetek-75',
    name: 'VALENCE MagneTek 75 Magnetic Keyboard',
    category: 'keyboards',
    price: 249,
    originalPrice: 279,
    rating: 4.92,
    reviewsCount: 142,
    tagline: 'Hall Effect Switches · 0.1mm Rapid Trigger · 8000Hz Polling',
    description: 'Engineered for tournament twitch reaction. Analog magnetic switches let you adjust actuation points from 0.1mm to 4.0mm with 0.05mm precision. Instant key reset eliminates debounce delay.',
    image: keyboardImg,
    inStock: true,
    stockCount: 19,
    warrantyYears: 2,
    switchType: 'magnetic',
    keyFeatures: [
      '8000Hz true hyper-polling rate with 0.125ms input response',
      'Continuous Rapid Trigger actuation without physical reset travel',
      'CNC milled 6063 aerospace aluminum case with mirror PVD brass weight',
      'Five-layer acoustic dampening: Poron foam, IXPE sheet, silicone base'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys) + Programmable Metal Knob',
      'Polling Rate': '8000Hz (0.125ms Latency)',
      'Switches': 'Gateron Magnetic Jade (Dual-Rail Hall Effect)',
      'Keycaps': '1.6mm Double-Shot PBT Cherry Profile',
      'Connectivity': 'Detachable Braided USB-C with Aviation Connector',
      'Weight': '1,640g (Solid Brass Counterweight)'
    },
    variants: {
      type: 'Switch Feel',
      options: [
        { id: 'magnetic-jade', name: 'MagneTek Jade (Rapid 0.1mm)', priceModifier: 0, inStock: true },
        { id: 'linear-oil', name: 'Factory Lubed Linear 45g', priceModifier: -10, inStock: true },
        { id: 'tactile-panda', name: 'Bespoke Tactile 58g', priceModifier: 15, inStock: true }
      ]
    }
  },
  {
    id: 'mouse-aerox-38',
    name: 'VALENCE Aerox Ultra 38g Wireless Mouse',
    category: 'mice',
    price: 169,
    originalPrice: 189,
    rating: 4.88,
    reviewsCount: 96,
    tagline: 'Magnesium Alloy Exoskeleton · 38 Grams · PAW3950 30K Sensor',
    description: 'Ultra-lightweight magnesium alloy chassis engineered to eliminate inertia. Fitted with custom micro-spaced zero-flex optical switches and virgin-grade PTFE hyper-skates for frictionless tracking.',
    image: mouseImg,
    inStock: true,
    stockCount: 11,
    warrantyYears: 2,
    keyFeatures: [
      '38 grams ultralight weight with structural magnesium alloy shell',
      'PixArt PAW3950 optical sensor: 30,000 DPI, 750 IPS, 50G acceleration',
      '8000Hz wireless dongle included in box with zero packet dropping',
      'Custom pre-tensioned optical microswitches rated for 100M clicks'
    ],
    specs: {
      'Sensor': 'PixArt PAW3950 Optical Gaming Sensor',
      'Polling Rate': 'Native 8000Hz Wireless & Wired',
      'Battery Life': 'Up to 90 hours (at 1000Hz), 35 hours (at 8000Hz)',
      'Dimensions': '119.8 x 62.4 x 37.8 mm (Medium Ergonomic)',
      'Weight': '38.2g (±1g)',
      'Skates': '100% Virgin Grade PTFE Curved Edges'
    },
    variants: {
      type: 'Finish & Coating',
      options: [
        { id: 'obsidian-matte', name: 'Obsidian Stealth Grip', priceModifier: 0, inStock: true },
        { id: 'raw-magnesium', name: 'Raw Bead-Blasted Magnesium', priceModifier: 20, inStock: true }
      ]
    }
  },
  {
    id: 'headset-planar-pro',
    name: 'VALENCE Planar Pro Wireless Headset',
    category: 'audio',
    price: 329,
    originalPrice: 359,
    rating: 4.94,
    reviewsCount: 64,
    tagline: '50mm Planar Magnetic Drivers · Lossless 2.4GHz · Broadcast Mic',
    description: 'Bespoke planar magnetic transducers produce razor-sharp spatial localization and zero distortion down to 10Hz. Pinpoint enemy footfalls and reload cues with studio-master precision.',
    image: headsetImg,
    inStock: true,
    stockCount: 7,
    warrantyYears: 2,
    keyFeatures: [
      '50mm custom neodymium planar magnetic drivers with sub-0.1% THD',
      'Ultra-wide soundstage optimized for directional tactical shooters',
      'Dual wireless: Low-latency 2.4GHz + Bluetooth 5.3 simultaneous mix',
      '9.7mm broadcast-grade condenser boom mic with physical mute LED'
    ],
    specs: {
      'Transducer Type': 'Planar Magnetic (Neodymium N52 Matrix)',
      'Frequency Response': '10Hz – 48,000Hz',
      'Impedance': '32 Ohms at 1kHz',
      'Wireless Latency': '<14ms via Dedicated 2.4GHz RF',
      'Battery Duration': '55 Hours continuous playback',
      'Cushions': 'Breathable cooling gel infused velour'
    },
    variants: {
      type: 'Ear Cushion Material',
      options: [
        { id: 'cooling-velour', name: 'Cooling-Gel Velour (Acoustic Open)', priceModifier: 0, inStock: true },
        { id: 'protein-leather', name: 'Protein Leather (Max Isolation)', priceModifier: 0, inStock: true }
      ]
    }
  },
  {
    id: 'display-horizon-34',
    name: 'VALENCE Horizon 34" QD-OLED Ultrawide',
    category: 'displays',
    price: 1099,
    originalPrice: 1199,
    rating: 4.96,
    reviewsCount: 47,
    tagline: '3440x1440 · 240Hz · 0.03ms GtG · Quantum Dot OLED Panel',
    description: 'Infinite contrast ratio with per-pixel local dimming. Certified VESA DisplayHDR True Black 400 and 99.3% DCI-P3 gamut. 0.03ms pixel response eliminates motion blur completely.',
    image: heroImg,
    inStock: true,
    stockCount: 6,
    warrantyYears: 3,
    keyFeatures: [
      '3rd Gen QD-OLED panel with graphene heatsink for burn-in protection',
      'True 0.03ms Gray-to-Gray response time for blur-free motion clarity',
      'Custom aluminum stand with cable raceway and zero desk wobble',
      '3-Year zero-bright-dot and burn-in replacement warranty'
    ],
    specs: {
      'Screen Size': '34.18 Inch Curved 1800R',
      'Resolution': 'UWQHD (3440 x 1440) 21:9 Aspect Ratio',
      'Refresh Rate': '240Hz Native G-Sync Compatible',
      'Peak Brightness': '1,000 nits (3% APL), 450 nits (10% APL)',
      'Connectivity': '2x DP 1.4 DSC, 1x HDMI 2.1 48Gbps, USB-C 90W PD',
      'Color Coverage': '99.3% DCI-P3 / 149% sRGB Factory Calibrated'
    },
    variants: {
      type: 'Mounting Hardware',
      options: [
        { id: 'desk-stand', name: 'Heavy Anodized Desk Base', priceModifier: 0, inStock: true },
        { id: 'gas-spring-arm', name: 'Heavy-Duty Gas Spring Monitor Arm', priceModifier: 80, inStock: true }
      ]
    }
  },
  {
    id: 'mat-cordura-glass',
    name: 'VALENCE Precision Cordura Battlestation Mat',
    category: 'accessories',
    price: 49,
    rating: 4.86,
    reviewsCount: 118,
    tagline: 'Micro-Woven Cordura Surface · Anti-Fray Stitched · 900x400mm',
    description: 'Engineered for consistent X/Y glide balance. The spill-resistant Cordura weave prevents humidity drag and mouse sensor spinouts during intense tournament sweeps.',
    image: keyboardImg,
    inStock: true,
    stockCount: 35,
    warrantyYears: 1,
    keyFeatures: [
      'Military-spec Cordura ripstop weave with waterproof nano-coating',
      'Sub-surface ultra-dense natural rubber base prevents shifting',
      'Precision micro-stitched perimeter flush with the gliding plane'
    ],
    specs: {
      'Dimensions': '900 x 400 x 4 mm (Deskpad Extended)',
      'Surface Type': 'Hybrid Speed/Control Cordura Fabric',
      'Base Material': '4mm High-Density Textured Natural Rubber',
      'Stitching': 'Sub-surface 360° Anti-Fray Micro-Border'
    }
  }
];

export const REVIEWS = [
  {
    author: 'Tarek "Vortex" Vance',
    role: 'Apex Legends Global Series Finalist',
    team: 'Sentinels Esports',
    avatar: 'TV',
    rating: 5,
    date: 'February 2026',
    verified: true,
    content: 'The MagneTek 75 switch response is unmatched. Having 0.1mm rapid trigger cut my counter-strafe timing in half. The physical build is like a solid slab of artillery.'
  },
  {
    author: 'Elena Rostova',
    role: '3D Simulation & Unreal Engine Dev',
    team: 'Polymath Labs',
    avatar: 'ER',
    rating: 5,
    date: 'January 2026',
    verified: true,
    content: 'We ordered three Apex One rigs for our real-time sim workstations. Even during 14-hour CUDA renders, the GPUs remain silent under 58°C with zero thermal throttling.'
  },
  {
    author: 'Marcus Lindqvist',
    role: 'Competitive CS2 Player',
    team: 'Nordic Frag League',
    avatar: 'ML',
    rating: 5,
    date: 'March 2026',
    verified: true,
    content: 'At 38 grams, the Aerox mouse feels like an extension of your hand. No palm sweat, no jitter at 8000Hz, and the PTFE skates glide effortlessly on the Cordura mat.'
  }
];
