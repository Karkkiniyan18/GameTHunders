import { CustomRigComponent } from '../types';

export const RIG_OPTIONS = {
  chassis: [
    {
      id: 'case-dual-glass',
      name: 'VALENCE Prism Dual-Chamber Smoked Glass',
      price: 240,
      wattage: 15,
      description: 'Dual-chamber isolation with panoramic tempered glass and 360mm top radiator support.'
    },
    {
      id: 'case-mesh-flow',
      name: 'VALENCE Flow High-Airflow CNC Perforated',
      price: 190,
      wattage: 10,
      description: 'Micro-mesh ventilation channels with filtered intake and stealth matte dark finish.'
    },
    {
      id: 'case-open-bench',
      name: 'VALENCE Stratum Open-Frame CNC Aluminum',
      price: 310,
      wattage: 10,
      description: 'Aerospace billet aluminum open frame for uncompromised thermal exchange.'
    }
  ] as CustomRigComponent[],

  cpu: [
    {
      id: 'cpu-9800x3d',
      name: 'AMD Ryzen 7 9800X3D (8-Core / 16-Thread, 5.2GHz V-Cache)',
      price: 489,
      wattage: 120,
      description: 'The undisputed champion of esports frame pacing and 1% low stability.'
    },
    {
      id: 'cpu-9950x',
      name: 'AMD Ryzen 9 9950X (16-Core / 32-Thread, 5.7GHz Boost)',
      price: 649,
      wattage: 170,
      description: 'Extreme multi-threaded firepower for simultaneous 4K 120fps streaming and rendering.'
    },
    {
      id: 'cpu-ultra-285k',
      name: 'Intel Core Ultra 9 285K (24-Core, up to 5.7GHz)',
      price: 599,
      wattage: 250,
      description: 'Hybrid architecture powerhouse with integrated NPU acceleration.'
    }
  ] as CustomRigComponent[],

  gpu: [
    {
      id: 'gpu-5090',
      name: 'NVIDIA GeForce RTX 5090 32GB GDDR7',
      price: 1999,
      wattage: 500,
      description: '32GB VRAM, DLSS 4 frame generation, and unconditional 4K 240Hz ray tracing performance.'
    },
    {
      id: 'gpu-5080',
      name: 'NVIDIA GeForce RTX 5080 16GB GDDR7',
      price: 1199,
      wattage: 380,
      description: 'Dominates competitive 1440p and 4K esports titles with ultra-low latency Reflex.'
    },
    {
      id: 'gpu-4080s',
      name: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X',
      price: 999,
      wattage: 320,
      description: 'Proven high-efficiency tournament powerhouse for fluid high refresh rates.'
    }
  ] as CustomRigComponent[],

  ram: [
    {
      id: 'ram-64-6400',
      name: '64GB (2x32GB) DDR5-6400 CL30 Dominator Titanium',
      price: 320,
      wattage: 15,
      description: 'Hand-binned SK Hynix A-die memory chips with forged aluminum heatspreaders.'
    },
    {
      id: 'ram-32-6000',
      name: '32GB (2x16GB) DDR5-6000 CL30 Stealth Low-Profile',
      price: 160,
      wattage: 10,
      description: 'Optimized AMD EXPO / Intel XMP profiles with ultra-tight sub-timings.'
    },
    {
      id: 'ram-96-6400',
      name: '96GB (2x48GB) DDR5-6400 CL32 High-Capacity Kit',
      price: 480,
      wattage: 20,
      description: 'Massive workstation-tier memory pool for heavy asset simulation and modded games.'
    }
  ] as CustomRigComponent[],

  cooler: [
    {
      id: 'cool-hardline',
      name: 'VALENCE Custom Borosilicate Hardline 360mm Loop',
      price: 490,
      wattage: 35,
      description: 'Hand-bent clear tubes with nickel-plated copper blocks and D5 variable PWM pump.'
    },
    {
      id: 'cool-aio-lcd',
      name: 'VALENCE CryoFlow 360mm AIO with IPS Telemetry Cap',
      price: 260,
      wattage: 25,
      description: '2.4" true-color IPS display on pump cap showing live thermals and coolant stats.'
    },
    {
      id: 'cool-stealth-air',
      name: 'VALENCE Twin-Tower Blackout Heatsink (7 Heatpipes)',
      price: 110,
      wattage: 10,
      description: 'Zero pump noise, dual fluid dynamic bearing 140mm fans, lifetime reliability.'
    }
  ] as CustomRigComponent[],

  storage: [
    {
      id: 'ssd-4tb-gen5',
      name: '4TB Gen 5 NVMe SSD (12,400 MB/s Sequential Read)',
      price: 440,
      wattage: 10,
      description: 'DirectStorage optimized with dedicated passive copper heatsink.'
    },
    {
      id: 'ssd-2tb-gen4',
      name: '2TB Gen 4 NVMe SSD (7,400 MB/s Read / 6,900 MB/s Write)',
      price: 180,
      wattage: 6,
      description: 'Reliable blazing-fast OS drive and tournament game library.'
    },
    {
      id: 'ssd-8tb-raid',
      name: '8TB Dual NVMe Gen 4 Array in Striped RAID 0',
      price: 790,
      wattage: 16,
      description: 'Double the capacity and extreme sustained throughput for massive creative workflows.'
    }
  ] as CustomRigComponent[],

  psu: [
    {
      id: 'psu-1200-ti',
      name: '1200W ATX 3.1 80+ Titanium Full Modular PSU',
      price: 360,
      wattage: 0,
      description: 'Native PCIe Gen 5 12V-2x6 cable, Japanese 105°C capacitors, 10-year warranty.'
    },
    {
      id: 'psu-1000-plat',
      name: '1000W ATX 3.1 80+ Platinum Full Modular PSU',
      price: 240,
      wattage: 0,
      description: 'Whisper-quiet zero-RPM fan mode up to 500W load. High transient spike margin.'
    },
    {
      id: 'psu-850-gold',
      name: '850W ATX 3.0 80+ Gold Modular PSU',
      price: 160,
      wattage: 0,
      description: 'Solid, high-efficiency power delivery with flexible flat ribbon cables.'
    }
  ] as CustomRigComponent[],

  cables: [
    {
      id: 'cable-sleeved-titanium',
      name: 'Custom Paracord Sleeved Cables (Graphite & Copper Combs)',
      price: 90,
      wattage: 0,
      description: 'Individually sleeved ultra-dense paracord with CNC billet aluminum cable combs.'
    },
    {
      id: 'cable-standard-stealth',
      name: 'Factory Ultra-Flexible Stealth Black Ribbons',
      price: 0,
      wattage: 0,
      description: 'Clean OEM all-black cables for discreet, minimalist cable routing.'
    }
  ] as CustomRigComponent[]
};
