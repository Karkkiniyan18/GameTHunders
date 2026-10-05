import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#161823]/95 backdrop-blur-md px-4 py-3 text-xs text-white shadow-xl shadow-black/60 font-sans">
        <CheckCircle2 className="h-4 w-4 text-[#ff5500] shrink-0" />
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  );
}
