import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CustomRigConfig, OrderConfirmation } from '../types';
import { sound } from '../utils/audio';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode: string;
  couponApplied: boolean;
  couponError: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (product: Product, quantity?: number, variant?: string, customRigSpecs?: CustomRigConfig) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Selected PDP Product
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Comparison
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isComparing: (productId: string) => boolean;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  removeFromCompare: (productId: string) => void;

  // Rig Builder Modal / View
  isRigBuilderOpen: boolean;
  setIsRigBuilderOpen: (open: boolean) => void;

  // Switch Lab
  isSwitchLabOpen: boolean;
  setIsSwitchLabOpen: (open: boolean) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  recentOrder: OrderConfirmation | null;
  setRecentOrder: (order: OrderConfirmation | null) => void;

  // Sound settings
  soundEnabled: boolean;
  toggleSound: () => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('valence_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('valence_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRigBuilderOpen, setIsRigBuilderOpen] = useState(false);
  const [isSwitchLabOpen, setIsSwitchLabOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentOrder, setRecentOrder] = useState<OrderConfirmation | null>(null);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponFixedDiscount, setCouponFixedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('valence_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('valence_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playUiTick();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    variant?: string,
    customRigSpecs?: CustomRigConfig
  ) => {
    sound.playCartAdd();
    const cartId = customRigSpecs 
      ? `rig-${Date.now()}` 
      : `${product.id}-${variant || 'default'}`;

    let unitPrice = product.price;
    if (variant && product.variants) {
      const match = product.variants.options.find(o => o.name === variant);
      if (match?.priceModifier) {
        unitPrice += match.priceModifier;
      }
    }

    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          quantity,
          selectedVariant: variant,
          customRigSpecs,
          unitPrice
        }
      ];
    });

    showToast(`Added "${product.name}" to gear crate`);
  };

  const removeFromCart = (cartId: string) => {
    sound.playUiTick();
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    sound.playUiTick();
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setCouponApplied(false);
    setCouponCode('');
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VALENCE10') {
      setCouponApplied(true);
      setCouponCode(clean);
      setCouponDiscountPercent(10);
      setCouponFixedDiscount(0);
      setCouponError('');
      sound.playCartAdd();
      showToast('10% Valance Vanguard discount applied');
      return true;
    } else if (clean === 'TITAN50') {
      setCouponApplied(true);
      setCouponCode(clean);
      setCouponDiscountPercent(0);
      setCouponFixedDiscount(50);
      setCouponError('');
      sound.playCartAdd();
      showToast('$50 Tournament credit applied');
      return true;
    } else {
      setCouponError('Invalid promotion code. Try "VALENCE10" or "TITAN50"');
      sound.playUiTick();
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponDiscountPercent(0);
    setCouponFixedDiscount(0);
    setCouponError('');
  };

  const toggleWishlist = (productId: string) => {
    sound.playUiTick();
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved loadout');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to loadout wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (product: Product) => {
    sound.playUiTick();
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 items for side-by-side comparison');
        return prev;
      }
      showToast(`Added ${product.name} to comparison tray`);
      setIsCompareOpen(true);
      return [...prev, product];
    });
  };

  const isComparing = (productId: string) => compareList.some(p => p.id === productId);

  const removeFromCompare = (productId: string) => {
    sound.playUiTick();
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discount = 0;
  if (couponApplied) {
    if (couponDiscountPercent > 0) {
      discount = (subtotal * couponDiscountPercent) / 100;
    } else if (couponFixedDiscount > 0) {
      discount = Math.min(subtotal, couponFixedDiscount);
    }
  }

  // Free shipping over $150
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * 0.0825; // 8.25% standard tax
  const total = taxable + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        shipping,
        total,
        couponCode,
        couponApplied,
        couponError,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        isComparing,
        isCompareOpen,
        setIsCompareOpen,
        removeFromCompare,
        isRigBuilderOpen,
        setIsRigBuilderOpen,
        isSwitchLabOpen,
        setIsSwitchLabOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        recentOrder,
        setRecentOrder,
        soundEnabled,
        toggleSound,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
