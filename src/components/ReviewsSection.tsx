import { Star, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';

export function ReviewsSection() {
  return (
    <section id="reviews-section" className="border-b border-white/10 bg-[#0b0c10] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              <span className="text-[#ff5500]">03. Tournament Proven</span>
              <span aria-hidden="true">·</span>
              <span>Esports & Studio Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Field-tested by competitive players.
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1 text-[#ff5500]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold tabular-nums">4.94 / 5.00 Average Score</span>
            <span aria-hidden="true">·</span>
            <span>Over 1,200 Verified Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#14161f] p-6 hover:border-[#ff5500]/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#ff5500]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{rev.date}</span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#1e212c] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#ff5500]">
                  {rev.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white font-display">{rev.author}</span>
                    {rev.verified && (
                      <span title="Verified Customer">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {rev.role} · <span className="text-zinc-300 font-medium">{rev.team}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
