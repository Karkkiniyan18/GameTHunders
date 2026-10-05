import { useState, useRef, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Craftsmanship } from './components/Craftsmanship';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RigBuilder } from './components/RigBuilder';
import { SwitchTester } from './components/SwitchTester';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CompareDrawer } from './components/CompareDrawer';
import { Toast } from './components/Toast';

function GamingShopApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const {
    selectedProduct,
    setSelectedProduct,
    isRigBuilderOpen,
    setIsRigBuilderOpen,
    isSwitchLabOpen,
    setIsSwitchLabOpen,
    isCheckoutOpen,
    setIsCheckoutOpen
  } = useCart();

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          e.preventDefault();
          searchInputRef.current?.focus();
          const elem = document.getElementById('catalog-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFocusSearch = () => {
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e2e4e9] flex flex-col font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Top Banner */}
      <PromoBanner />

      {/* Strict 1-row 3-zone Top Bar Contract */}
      <Navbar onSearchClick={handleFocusSearch} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Product Catalog */}
        <Catalog
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchInputRef={searchInputRef}
        />

        {/* Engineering & Craftsmanship Section */}
        <Craftsmanship />

        {/* Attributable Social Proof / Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Custom Battlestation Rig Builder */}
      <RigBuilder
        isOpen={isRigBuilderOpen}
        onClose={() => setIsRigBuilderOpen(false)}
      />

      {/* Acoustic Switch Tester Lab */}
      <SwitchTester
        isOpen={isSwitchLabOpen}
        onClose={() => setIsSwitchLabOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Multi-step Checkout & Receipt Tracking Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Hardware Comparison Matrix Drawer */}
      <CompareDrawer />

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <GamingShopApp />
    </CartProvider>
  );
}
