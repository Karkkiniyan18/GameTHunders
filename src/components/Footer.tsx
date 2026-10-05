import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    sound.playCartAdd();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-[#08090c] text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-black tracking-widest text-white font-display uppercase">
              VALENCE
            </span>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Precision engineering laboratory dedicated to competitive gaming hardware, custom liquid cooling architectures, and tournament peripherals.
            </p>
            <div className="text-[11px] font-mono text-zinc-500 space-y-1">
              <p>Valence Hardware Labs Inc.</p>
              <p>Designed in Seattle, Washington · Worldwide Insured Logistics</p>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white">Hardware</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Custom Liquid Rigs</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Hall-Effect Keyboards</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Ultralight Mice</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">QD-OLED Displays</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Cordura Battlestation Mats</a></li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white">Support & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">3-Year Advance Warranty</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">72-Hour Burn-In Protocol</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Global White-Glove Shipping</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Firmware & Driver Hub</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Day Zero-Risk Trial</span></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white">Engineering Dispatch</h4>
            <p className="text-xs text-zinc-400">
              Receive limited silicon drop notifications, firmware updates, and tournament benchmark reports.
            </p>

            {subscribed ? (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-emerald-400 text-xs flex items-center gap-1.5">
                <Check className="h-4 w-4 shrink-0" />
                <span>Subscribed to engineering dispatch</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#ff5500] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="rounded-lg bg-[#ff5500] px-3 py-2 text-white hover:bg-[#ff6a1a] transition-colors cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} VALENCE GAMING INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Hardware Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
